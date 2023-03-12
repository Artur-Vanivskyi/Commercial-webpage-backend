const service = require("./clients.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
  const client = await service.list();
  res.json({ data: client });
}

const VALID_PROPERTIES = ["full_name", "mobile_number", "email", "message"];

function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;
  const invalidStatuses = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );
  if (invalidStatuses.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidStatuses.join(", ")}`,
    });
  }
  next();
}

function hasProperties(properties) {
  return function (req, res, next) {
    const { data = {} } = req.body;
    try {
      properties.forEach((property) => {
        if (!data[property]) {
          const error = new Error(`A '${property}' property is required.`);
          error.status = 400;
          throw error;
        }
      });
      next();
    } catch (error) {
      next(error);
    }
  };
}

const hasRequiredProperties = hasProperties(VALID_PROPERTIES);

// --- Validation for name field ---

//Helper function
function nameIsValid(name) {
  return name.match(/^[a-zA-Z\s]*$/);
}

function nameField(req, res, next) {
  const { full_name } = req.body.data;

  if (full_name.length < 2) {
    return next({
      status: 400,
      message: "Name must be longer than 2 characters",
    });
  }
  if (full_name.length > 25) {
    return next({
      status: 400,
      message: "Name is too long",
    });
  }
  if (typeof full_name !== "string") {
    return next({
      status: 400,
      message: "Field must contain alphabetic characters",
    });
  }
  if (!nameIsValid(full_name)) {
    return next({
      status: 400,
      message: "Field must not include special characters",
    });
  }
  next();
}

// --- Validation for phone number ---

function validNumber(phoneNumber) {
  return phoneNumber.match(/^\+?\d{10,14}$/);
}

function validatePhoneNumber(req, res, next) {
  const { mobile_number } = req.body.data;

  if (!mobile_number) {
    return next({
      status: 400,
      message: "Filed must contain numbers",
    });
  }
  if (!validNumber(mobile_number)) {
    return next({
      status: 400,
      message: "Must be valid format",
    });
  }
  next();
}

// --- Validation for email ---

function validEmail(email) {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/;
  return email.match(emailRegex);
}

function validateEmail(req, res, next) {
  let { email } = req.body.data;
  email = email.toLowerCase();
  if (!validEmail(email)) {
    return next({
      status: 400,
      message: "Must be email format",
    });
  }
  if (email.length > 25) {
    return next({
      status: 400,
      message: "Email must contain less than 25 characters",
    });
  }
  next();
}

// --- Validation for message ---

//Helper function
function validateText(textMessage) {
  const forbiddenChars = /[!@#$%^&()_+\-=\[\]{};':"\\|<>\/?]/;
  return forbiddenChars.test(textMessage);
}

function validateMessage(req, res, next) {
  const { message } = req.body.data;

  if (message.length < 25) {
    return next({
      status: 400,
      message: "Message must be more than 25 characters",
    });
  }

  if (message.length > 600) {
    return next({
      status: 400,
      message: "Message must be smaller than 600 characters",
    });
  }

  if (!message || validateText(message)) {
    return next({
      status: 400,
      message: "Message contains forbidden characters",
    });
  }
  next();
}

async function create(req, res, next) {
  const client = await service.create(req.body.data);
  res.status(201).json({ data: client });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasOnlyValidProperties,
    hasRequiredProperties,
    nameField,
    validatePhoneNumber,
    validateEmail,
    validateMessage,
    asyncErrorBoundary(create),
  ],
};

class BaseModal {
  constructor(data, message) {
    if (typeof data === 'string') {
      this.message = data;
      message = null;
      data = null;
    }
    if (data) {
      this.data = data;
    }
    if (message) {
      this.message = message;
    }
  }
}

class SuccessModal extends BaseModal {
  constructor(data, message) {
    super(data, message);
    this.errno = 0;
  }
}


class ErrorModal extends BaseModal {
  constructor(data, message) {
    super(data, message);
    this.errno = -1;
  }
}

module.exports = {
  SuccessModal,
  ErrorModal
}
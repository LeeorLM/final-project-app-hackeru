class CustomResponse {
  static STATUSES = {
    success: "success",
    fail: "fail",
  };

  status;
  msg;
  data;

  constructor(status, msg, data) {
    this.status = status;
    this.msg = msg;
    this.data = data;
  }
}

module.exports = CustomResponse;

/**
 * @fileoverview gRPC-Web generated client stub for 
 * @enhanceable
 * @public
 */

// Code generated by protoc-gen-grpc-web. DO NOT EDIT.
// versions:
// 	protoc-gen-grpc-web v1.4.2
// 	protoc              v4.24.3
// source: src/proto/stackoverflow.proto


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = require('./stackoverflow_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.StackOverflowClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname.replace(/\/+$/, '');

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.StackOverflowPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname.replace(/\/+$/, '');

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.GreetRequest,
 *   !proto.GreetResponse>}
 */
const methodDescriptor_StackOverflow_Greet = new grpc.web.MethodDescriptor(
  '/StackOverflow/Greet',
  grpc.web.MethodType.UNARY,
  proto.GreetRequest,
  proto.GreetResponse,
  /**
   * @param {!proto.GreetRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.GreetResponse.deserializeBinary
);


/**
 * @param {!proto.GreetRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.GreetResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.GreetResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.StackOverflowClient.prototype.greet =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/StackOverflow/Greet',
      request,
      metadata || {},
      methodDescriptor_StackOverflow_Greet,
      callback);
};


/**
 * @param {!proto.GreetRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.GreetResponse>}
 *     Promise that resolves to the response
 */
proto.StackOverflowPromiseClient.prototype.greet =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/StackOverflow/Greet',
      request,
      metadata || {},
      methodDescriptor_StackOverflow_Greet);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.SignUpRequest,
 *   !proto.SignUpResponse>}
 */
const methodDescriptor_StackOverflow_SignUp = new grpc.web.MethodDescriptor(
  '/StackOverflow/SignUp',
  grpc.web.MethodType.UNARY,
  proto.SignUpRequest,
  proto.SignUpResponse,
  /**
   * @param {!proto.SignUpRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.SignUpResponse.deserializeBinary
);


/**
 * @param {!proto.SignUpRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.SignUpResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.SignUpResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.StackOverflowClient.prototype.signUp =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/StackOverflow/SignUp',
      request,
      metadata || {},
      methodDescriptor_StackOverflow_SignUp,
      callback);
};


/**
 * @param {!proto.SignUpRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.SignUpResponse>}
 *     Promise that resolves to the response
 */
proto.StackOverflowPromiseClient.prototype.signUp =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/StackOverflow/SignUp',
      request,
      metadata || {},
      methodDescriptor_StackOverflow_SignUp);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.LoginRequest,
 *   !proto.LoginResponse>}
 */
const methodDescriptor_StackOverflow_Login = new grpc.web.MethodDescriptor(
  '/StackOverflow/Login',
  grpc.web.MethodType.UNARY,
  proto.LoginRequest,
  proto.LoginResponse,
  /**
   * @param {!proto.LoginRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.LoginResponse.deserializeBinary
);


/**
 * @param {!proto.LoginRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.LoginResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.LoginResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.StackOverflowClient.prototype.login =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/StackOverflow/Login',
      request,
      metadata || {},
      methodDescriptor_StackOverflow_Login,
      callback);
};


/**
 * @param {!proto.LoginRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.LoginResponse>}
 *     Promise that resolves to the response
 */
proto.StackOverflowPromiseClient.prototype.login =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/StackOverflow/Login',
      request,
      metadata || {},
      methodDescriptor_StackOverflow_Login);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.GetTokenRequest,
 *   !proto.GetTokenResponse>}
 */
const methodDescriptor_StackOverflow_GetToken = new grpc.web.MethodDescriptor(
  '/StackOverflow/GetToken',
  grpc.web.MethodType.UNARY,
  proto.GetTokenRequest,
  proto.GetTokenResponse,
  /**
   * @param {!proto.GetTokenRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.GetTokenResponse.deserializeBinary
);


/**
 * @param {!proto.GetTokenRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.GetTokenResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.GetTokenResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.StackOverflowClient.prototype.getToken =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/StackOverflow/GetToken',
      request,
      metadata || {},
      methodDescriptor_StackOverflow_GetToken,
      callback);
};


/**
 * @param {!proto.GetTokenRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.GetTokenResponse>}
 *     Promise that resolves to the response
 */
proto.StackOverflowPromiseClient.prototype.getToken =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/StackOverflow/GetToken',
      request,
      metadata || {},
      methodDescriptor_StackOverflow_GetToken);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.CheckTokenRequest,
 *   !proto.CheckTokenResponse>}
 */
const methodDescriptor_StackOverflow_CheckToken = new grpc.web.MethodDescriptor(
  '/StackOverflow/CheckToken',
  grpc.web.MethodType.UNARY,
  proto.CheckTokenRequest,
  proto.CheckTokenResponse,
  /**
   * @param {!proto.CheckTokenRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.CheckTokenResponse.deserializeBinary
);


/**
 * @param {!proto.CheckTokenRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.CheckTokenResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.CheckTokenResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.StackOverflowClient.prototype.checkToken =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/StackOverflow/CheckToken',
      request,
      metadata || {},
      methodDescriptor_StackOverflow_CheckToken,
      callback);
};


/**
 * @param {!proto.CheckTokenRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.CheckTokenResponse>}
 *     Promise that resolves to the response
 */
proto.StackOverflowPromiseClient.prototype.checkToken =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/StackOverflow/CheckToken',
      request,
      metadata || {},
      methodDescriptor_StackOverflow_CheckToken);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.LogoutRequest,
 *   !proto.LogoutResponse>}
 */
const methodDescriptor_StackOverflow_Logout = new grpc.web.MethodDescriptor(
  '/StackOverflow/Logout',
  grpc.web.MethodType.UNARY,
  proto.LogoutRequest,
  proto.LogoutResponse,
  /**
   * @param {!proto.LogoutRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.LogoutResponse.deserializeBinary
);


/**
 * @param {!proto.LogoutRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.LogoutResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.LogoutResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.StackOverflowClient.prototype.logout =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/StackOverflow/Logout',
      request,
      metadata || {},
      methodDescriptor_StackOverflow_Logout,
      callback);
};


/**
 * @param {!proto.LogoutRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.LogoutResponse>}
 *     Promise that resolves to the response
 */
proto.StackOverflowPromiseClient.prototype.logout =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/StackOverflow/Logout',
      request,
      metadata || {},
      methodDescriptor_StackOverflow_Logout);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.ChangePasswordRequest,
 *   !proto.ChangePasswordResponse>}
 */
const methodDescriptor_StackOverflow_ChangePassword = new grpc.web.MethodDescriptor(
  '/StackOverflow/ChangePassword',
  grpc.web.MethodType.UNARY,
  proto.ChangePasswordRequest,
  proto.ChangePasswordResponse,
  /**
   * @param {!proto.ChangePasswordRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.ChangePasswordResponse.deserializeBinary
);


/**
 * @param {!proto.ChangePasswordRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.ChangePasswordResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ChangePasswordResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.StackOverflowClient.prototype.changePassword =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/StackOverflow/ChangePassword',
      request,
      metadata || {},
      methodDescriptor_StackOverflow_ChangePassword,
      callback);
};


/**
 * @param {!proto.ChangePasswordRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ChangePasswordResponse>}
 *     Promise that resolves to the response
 */
proto.StackOverflowPromiseClient.prototype.changePassword =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/StackOverflow/ChangePassword',
      request,
      metadata || {},
      methodDescriptor_StackOverflow_ChangePassword);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.ChangeUserNameRequest,
 *   !proto.ChangeUserNameResponse>}
 */
const methodDescriptor_StackOverflow_ChangeUserName = new grpc.web.MethodDescriptor(
  '/StackOverflow/ChangeUserName',
  grpc.web.MethodType.UNARY,
  proto.ChangeUserNameRequest,
  proto.ChangeUserNameResponse,
  /**
   * @param {!proto.ChangeUserNameRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.ChangeUserNameResponse.deserializeBinary
);


/**
 * @param {!proto.ChangeUserNameRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.ChangeUserNameResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ChangeUserNameResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.StackOverflowClient.prototype.changeUserName =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/StackOverflow/ChangeUserName',
      request,
      metadata || {},
      methodDescriptor_StackOverflow_ChangeUserName,
      callback);
};


/**
 * @param {!proto.ChangeUserNameRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ChangeUserNameResponse>}
 *     Promise that resolves to the response
 */
proto.StackOverflowPromiseClient.prototype.changeUserName =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/StackOverflow/ChangeUserName',
      request,
      metadata || {},
      methodDescriptor_StackOverflow_ChangeUserName);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.ChangeDescriptionRequest,
 *   !proto.ChangeDescriptionResponse>}
 */
const methodDescriptor_StackOverflow_ChangeDescription = new grpc.web.MethodDescriptor(
  '/StackOverflow/ChangeDescription',
  grpc.web.MethodType.UNARY,
  proto.ChangeDescriptionRequest,
  proto.ChangeDescriptionResponse,
  /**
   * @param {!proto.ChangeDescriptionRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.ChangeDescriptionResponse.deserializeBinary
);


/**
 * @param {!proto.ChangeDescriptionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.ChangeDescriptionResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ChangeDescriptionResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.StackOverflowClient.prototype.changeDescription =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/StackOverflow/ChangeDescription',
      request,
      metadata || {},
      methodDescriptor_StackOverflow_ChangeDescription,
      callback);
};


/**
 * @param {!proto.ChangeDescriptionRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ChangeDescriptionResponse>}
 *     Promise that resolves to the response
 */
proto.StackOverflowPromiseClient.prototype.changeDescription =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/StackOverflow/ChangeDescription',
      request,
      metadata || {},
      methodDescriptor_StackOverflow_ChangeDescription);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.ChangeSkillRequest,
 *   !proto.ChangeSkillResponse>}
 */
const methodDescriptor_StackOverflow_ChangeSkill = new grpc.web.MethodDescriptor(
  '/StackOverflow/ChangeSkill',
  grpc.web.MethodType.UNARY,
  proto.ChangeSkillRequest,
  proto.ChangeSkillResponse,
  /**
   * @param {!proto.ChangeSkillRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.ChangeSkillResponse.deserializeBinary
);


/**
 * @param {!proto.ChangeSkillRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.ChangeSkillResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ChangeSkillResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.StackOverflowClient.prototype.changeSkill =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/StackOverflow/ChangeSkill',
      request,
      metadata || {},
      methodDescriptor_StackOverflow_ChangeSkill,
      callback);
};


/**
 * @param {!proto.ChangeSkillRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ChangeSkillResponse>}
 *     Promise that resolves to the response
 */
proto.StackOverflowPromiseClient.prototype.changeSkill =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/StackOverflow/ChangeSkill',
      request,
      metadata || {},
      methodDescriptor_StackOverflow_ChangeSkill);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.AddSkillRequest,
 *   !proto.AddSkillResponse>}
 */
const methodDescriptor_StackOverflow_AddSkill = new grpc.web.MethodDescriptor(
  '/StackOverflow/AddSkill',
  grpc.web.MethodType.UNARY,
  proto.AddSkillRequest,
  proto.AddSkillResponse,
  /**
   * @param {!proto.AddSkillRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.AddSkillResponse.deserializeBinary
);


/**
 * @param {!proto.AddSkillRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.AddSkillResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.AddSkillResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.StackOverflowClient.prototype.addSkill =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/StackOverflow/AddSkill',
      request,
      metadata || {},
      methodDescriptor_StackOverflow_AddSkill,
      callback);
};


/**
 * @param {!proto.AddSkillRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.AddSkillResponse>}
 *     Promise that resolves to the response
 */
proto.StackOverflowPromiseClient.prototype.addSkill =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/StackOverflow/AddSkill',
      request,
      metadata || {},
      methodDescriptor_StackOverflow_AddSkill);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.DeleteSkillRequest,
 *   !proto.DeleteSkillResponse>}
 */
const methodDescriptor_StackOverflow_DeleteSkill = new grpc.web.MethodDescriptor(
  '/StackOverflow/DeleteSkill',
  grpc.web.MethodType.UNARY,
  proto.DeleteSkillRequest,
  proto.DeleteSkillResponse,
  /**
   * @param {!proto.DeleteSkillRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.DeleteSkillResponse.deserializeBinary
);


/**
 * @param {!proto.DeleteSkillRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.DeleteSkillResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.DeleteSkillResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.StackOverflowClient.prototype.deleteSkill =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/StackOverflow/DeleteSkill',
      request,
      metadata || {},
      methodDescriptor_StackOverflow_DeleteSkill,
      callback);
};


/**
 * @param {!proto.DeleteSkillRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.DeleteSkillResponse>}
 *     Promise that resolves to the response
 */
proto.StackOverflowPromiseClient.prototype.deleteSkill =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/StackOverflow/DeleteSkill',
      request,
      metadata || {},
      methodDescriptor_StackOverflow_DeleteSkill);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.DeleteUserRequest,
 *   !proto.DeleteUserResponse>}
 */
const methodDescriptor_StackOverflow_DeleteUser = new grpc.web.MethodDescriptor(
  '/StackOverflow/DeleteUser',
  grpc.web.MethodType.UNARY,
  proto.DeleteUserRequest,
  proto.DeleteUserResponse,
  /**
   * @param {!proto.DeleteUserRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.DeleteUserResponse.deserializeBinary
);


/**
 * @param {!proto.DeleteUserRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.DeleteUserResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.DeleteUserResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.StackOverflowClient.prototype.deleteUser =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/StackOverflow/DeleteUser',
      request,
      metadata || {},
      methodDescriptor_StackOverflow_DeleteUser,
      callback);
};


/**
 * @param {!proto.DeleteUserRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.DeleteUserResponse>}
 *     Promise that resolves to the response
 */
proto.StackOverflowPromiseClient.prototype.deleteUser =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/StackOverflow/DeleteUser',
      request,
      metadata || {},
      methodDescriptor_StackOverflow_DeleteUser);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.UpdateRatingRequest,
 *   !proto.UpdateRatingResponse>}
 */
const methodDescriptor_StackOverflow_UpdateRating = new grpc.web.MethodDescriptor(
  '/StackOverflow/UpdateRating',
  grpc.web.MethodType.UNARY,
  proto.UpdateRatingRequest,
  proto.UpdateRatingResponse,
  /**
   * @param {!proto.UpdateRatingRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.UpdateRatingResponse.deserializeBinary
);


/**
 * @param {!proto.UpdateRatingRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.UpdateRatingResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.UpdateRatingResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.StackOverflowClient.prototype.updateRating =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/StackOverflow/UpdateRating',
      request,
      metadata || {},
      methodDescriptor_StackOverflow_UpdateRating,
      callback);
};


/**
 * @param {!proto.UpdateRatingRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.UpdateRatingResponse>}
 *     Promise that resolves to the response
 */
proto.StackOverflowPromiseClient.prototype.updateRating =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/StackOverflow/UpdateRating',
      request,
      metadata || {},
      methodDescriptor_StackOverflow_UpdateRating);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.ChangeUserStatusRequest,
 *   !proto.ChangeUserStatusResponse>}
 */
const methodDescriptor_StackOverflow_ChangeUserStatus = new grpc.web.MethodDescriptor(
  '/StackOverflow/ChangeUserStatus',
  grpc.web.MethodType.UNARY,
  proto.ChangeUserStatusRequest,
  proto.ChangeUserStatusResponse,
  /**
   * @param {!proto.ChangeUserStatusRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.ChangeUserStatusResponse.deserializeBinary
);


/**
 * @param {!proto.ChangeUserStatusRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.ChangeUserStatusResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.ChangeUserStatusResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.StackOverflowClient.prototype.changeUserStatus =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/StackOverflow/ChangeUserStatus',
      request,
      metadata || {},
      methodDescriptor_StackOverflow_ChangeUserStatus,
      callback);
};


/**
 * @param {!proto.ChangeUserStatusRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.ChangeUserStatusResponse>}
 *     Promise that resolves to the response
 */
proto.StackOverflowPromiseClient.prototype.changeUserStatus =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/StackOverflow/ChangeUserStatus',
      request,
      metadata || {},
      methodDescriptor_StackOverflow_ChangeUserStatus);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.GetUserDetailsByIdRequest,
 *   !proto.GetUserDetailsByIdResponse>}
 */
const methodDescriptor_StackOverflow_GetUserDetailsById = new grpc.web.MethodDescriptor(
  '/StackOverflow/GetUserDetailsById',
  grpc.web.MethodType.UNARY,
  proto.GetUserDetailsByIdRequest,
  proto.GetUserDetailsByIdResponse,
  /**
   * @param {!proto.GetUserDetailsByIdRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.GetUserDetailsByIdResponse.deserializeBinary
);


/**
 * @param {!proto.GetUserDetailsByIdRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.GetUserDetailsByIdResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.GetUserDetailsByIdResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.StackOverflowClient.prototype.getUserDetailsById =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/StackOverflow/GetUserDetailsById',
      request,
      metadata || {},
      methodDescriptor_StackOverflow_GetUserDetailsById,
      callback);
};


/**
 * @param {!proto.GetUserDetailsByIdRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.GetUserDetailsByIdResponse>}
 *     Promise that resolves to the response
 */
proto.StackOverflowPromiseClient.prototype.getUserDetailsById =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/StackOverflow/GetUserDetailsById',
      request,
      metadata || {},
      methodDescriptor_StackOverflow_GetUserDetailsById);
};


module.exports = proto;


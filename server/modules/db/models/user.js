"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ObjectId = mongoose_1.Schema.Types.ObjectId;
exports.UserSchema = new mongoose_1.Schema({
    username: String,
    fname: String,
    lname: String,
    createdDate: Date,
    password: String,
    pets: [ObjectId]
}, { collection: 'users' });
exports.UserSchema.pre('save', function () {
    return __awaiter(this, void 0, void 0, function* () {
        this.createdDate = new Date();
    });
});
exports.User = mongoose_1.model('users', exports.UserSchema);
//# sourceMappingURL=user.js.map
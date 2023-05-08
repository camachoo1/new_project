"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupPassportSession = exports.createAccountForAuth0 = exports.setupPassport = void 0;
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const passport_1 = __importDefault(require("passport"));
const passport_auth0_1 = __importDefault(require("passport-auth0"));
const express_session_1 = __importDefault(require("express-session"));
const DB_1 = require("../DB");
const { mongoURI: db } = require('./config/keys');
function setupPassport() {
    passport_1.default.use('auth0', new passport_auth0_1.default({
        domain: `process.env.DOMAIN`,
        clientID: `process.env.CLIENT_ID`,
        clientSecret: `process.env.CLIENT_SECRET`,
        callbackURL: '',
    }, function (accessToken, refreshToken, extraParams, profile, done) {
        db.User.findOne({ authZeroUserId: String(profile.id) })
            .then((user) => (user ? user : createAccountForAuth0(profile)))
            .then((user) => done(null, user))
            .catch((err) => done(err));
    }));
}
exports.setupPassport = setupPassport;
function createAccountForAuth0(profile) {
    const newUser = new db.User({
        authZeroUserId: profile.id,
        name: profile.displayName,
        email: (profile.emails && profile.emails[0]) ? profile.emails[0].value : '',
    });
    return new db.User(newUser).save();
}
exports.createAccountForAuth0 = createAccountForAuth0;
function setupPassportSession(app) {
    app.use((0, express_session_1.default)({
        secret: '',
        name: '',
        resave: false,
        saveUninitialized: false,
        store: connect_mongo_1.default.create({
            clientPromise: (0, DB_1.getMongoClient)(),
            collectionName: 'userSessions',
            touchAfter: 24 * 60 * 60,
        }),
    }));
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    setupPassport();
}
exports.setupPassportSession = setupPassportSession;

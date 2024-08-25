import passport from "passport";

passport.authenticate = jest.fn((authType, options, callback) => () => { callback('This is an error', null); });
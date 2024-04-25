import passport from 'passport';

export const authenticate = passport.authenticate('local', {
  failureRedirect: '/auth/login'
});

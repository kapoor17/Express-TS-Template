import passport from 'passport';

export const authenticate = passport.authenticate('local', {
  successRedirect: '/'
});

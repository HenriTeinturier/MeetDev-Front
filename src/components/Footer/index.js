import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './footer.scss';
import instagram from '../../assets/images/instagram.png';
import facebook from '../../assets/images/facebook.png';
import twitter from '../../assets/images/twitter.png';

// connected, setConnected, developper, setDevelopper, recruiter, setRecruiter, role, setRole,
function Footer({
  setConnected, developper, setDevelopper, recruiter, setRecruiter,
}) {
  //* temporary: create button to footer to change state for static navigation
  //* for helpng finish the static navigation
  const classDevelopper = (developper ? 'footer__stateNavigation--developperOn' : 'footer__stateNavigation--developperOff');
  const classRecruiter = (recruiter ? 'footer__stateNavigation--recruiterOn' : 'footer__stateNavigation--recruiterOff');

  return (
    <div className="footer">
      <div className="footer__contact">
        <Link to="/contact">Contact</Link>
      </div>
      <div className="footer__mentionslegales">
        <Link to="/mentions-legales">Mentions-Légales</Link>
      </div>
      <div className="footer__stateNavigation">
        <button type="button" className="footer__stateNavigation--connected" onClick={() => (setConnected(true))}>
          connexion
        </button>
        <button
          type="button"
          className="footer__stateNavigation--deconnected"
          onClick={() => {
            setConnected(false);
            setDevelopper(false);
            setRecruiter(false);
          }}
        >
          deconnexion
        </button>
        <button
          type="button"
          className={classDevelopper}
          onClick={() => {
            setDevelopper(!developper);
          }}
        >
          developper
        </button>
        <button
          type="button"
          className={classRecruiter}
          onClick={() => {
            setRecruiter(!recruiter);
          }}
        >
          recruiter
        </button>

      </div>
      <div className="footer__logos">
        <img
          className="footer__logos--img"
          src={instagram}
          alt="logo instagram"
        />
        <img
          className="footer__logos--img"
          src={twitter}
          alt="logo twitter"
        />
        <img
          className="footer__logos--img"
          src={facebook}
          alt="logo facebook"
        />

      </div>
    </div>
  );
}

Footer.propTypes = {
  // connected: PropTypes.bool.isRequired,
  setConnected: PropTypes.func.isRequired,
  developper: PropTypes.bool.isRequired,
  setDevelopper: PropTypes.func.isRequired,
  recruiter: PropTypes.bool.isRequired,
  setRecruiter: PropTypes.func.isRequired,
  // role: PropTypes.string.isRequired,
  // setRole: PropTypes.func.isRequired,

};

export default Footer;

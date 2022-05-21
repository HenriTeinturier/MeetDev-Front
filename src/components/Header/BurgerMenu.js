import './burgerMenu.scss';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
// import { useEffect } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { burgerMenuOpen, loginBurger, logout } from '../../actions/settings';
import { loginTest } from '../../actions/middleware';
import { login } from '../../actions/formLogin';

function BurgerMenu() {
  const dispatch = useDispatch();

  // function to close/open burger menu
  const closeMenu = () => {
    dispatch(burgerMenuOpen());
  };

  function handleChangeForm(e) {
    const { value } = e.target;
    const { name } = e.target;
    dispatch(login(value, name));
  }

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    // console.log('click');
    console.log('click');
    dispatch(loginTest());
    dispatch(burgerMenuOpen());
    navigate('/');
  }

  const logged = useSelector((state) => state.settings.log.logged);
  const isRecruiter = useSelector((state) => state.settings.log.isRecruiter);
  const isLogin = useSelector((state) => state.settings.navigation.burgerLogin);
  const burgerMenu = useSelector((state) => state.settings.navigation.burgerMenuOpen);
  const formLogin = useSelector((state) => state.formLogin.login);

  // configure apparition effect burger menu (framer-motion)
  const animateFrom = { opacity: 0, x: -40 }; // start effect
  const animateTo = { opacity: 1, x: 0 }; // end effect

  // configure animation apparition form login
  const loginAnimation = {
    key: 'login',
    initial: { y: '-50%', opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: '-50%', opacity: 0 },
    transition: { duration: 0.4, ease: 'easeOut' },
  };

  const burgerMenuAnimation = {
    key: 'burgerMenu',
    initial: { x: '-100vw', opacity: 0.7 },
    animate: {
      x: 0, opacity: 1,
    },
    exit: { x: '-100vw', opacity: 0.7 },
    transition: { duration: 0.3, type: 'tween' },
  };

  return (
  // to use framer-motion on element we need to rename his balise html with "motion."
    <AnimatePresence>
      {/* // wrapper of menu burger */}
      <motion.div
        className="burgerMenu"
      >

        {/* close button burger menu */}
        <AiOutlineCloseCircle className="burgerMenu__exit" onClick={() => dispatch(burgerMenuOpen())} />
        <AnimatePresence>
          {
            burgerMenu && (
            <motion.ul
              className="burgerMenu__items"
              {...burgerMenuAnimation}
            >
              {/* if not Logged display connexion button + en Savoir +*/}
              <AnimatePresence>
                { !logged && (
                <>
                  <motion.li
                    initial={animateFrom}
                    animate={animateTo}
                    transition={{ delay: 0.15 }}
                    className="burgerMenu__items--log"
                    onClick={() => {
                    // dispatch(toggleWindowLog());
                    // dispatch(closeMenu());
                      dispatch(loginBurger());
                    // setOpenModal(true);
                    }}
                  >
                    Connexion
                  </motion.li>
                  {/* If click on Connexion open form login menu burger */}
                  <AnimatePresence>
                    {
              isLogin && (
                <motion.div {...loginAnimation}>
                  <form
                    className="burgerMenu__login"
                    onChange={handleChangeForm}
                    onSubmit={handleSubmit}
                  >
                    <input className="burgerMenu__login--mail" type="email" placeholder="Email" value={formLogin.email} name="email" />
                    <input className="burgerMenu__login--password" placeholder="Mot de passe" type="password" name="password" value={formLogin.password} />
                    <button
                      type="submit"
                      className="burgerMenu__login--button"
                      onClick={() => {
                        // dispatch(toggleWindowLog());
                        handleSubmit();
                        // dispatch(logged());
                      }}
                    >
                      Se connecter
                    </button>
                  </form>
                </motion.div>
              )
            }
                  </AnimatePresence>

                  <motion.li initial={animateFrom} animate={animateTo} transition={{ delay: 0.25 }} className="burgerMenu__items--item" onClick={closeMenu}>
                    <NavLink to="/">
                      Meet Dev
                    </NavLink>
                  </motion.li>
                  <motion.li initial={animateFrom} animate={animateTo} transition={{ delay: 0.35 }} className="burgerMenu__items--item" onClick={closeMenu}>
                    <NavLink to="/home-developer">
                      Je suis développeur
                    </NavLink>
                  </motion.li>
                  <motion.li initial={animateFrom} animate={animateTo} transition={{ delay: 0.45 }} className="burgerMenu__items--item" onClick={closeMenu}>
                    <NavLink to="/home-recruiter">
                      Je suis recruteur
                    </NavLink>
                  </motion.li>
                  <motion.li initial={animateFrom} animate={animateTo} transition={{ delay: 0.55 }} className="burgerMenu__items--item" onClick={closeMenu}>
                    <NavLink to="/en-savoir-plus">
                      En savoir plus
                    </NavLink>
                  </motion.li>

                </>
                )}
              </AnimatePresence>
              {
            logged && (
              <>

                <motion.li initial={animateFrom} animate={animateTo} transition={{ delay: 0.15 }} className="burgerMenu__items--item" onClick={closeMenu}><NavLink to="/profil">Mon profil</NavLink></motion.li>
                <motion.li initial={animateFrom} animate={animateTo} transition={{ delay: 0.25 }} className="burgerMenu__items--item" onClick={closeMenu}><NavLink to="/modifier">Modifier profil</NavLink></motion.li>
                <motion.li initial={animateFrom} animate={animateTo} transition={{ delay: 0.45 }} className="burgerMenu__items--item" onClick={closeMenu}><NavLink to="/recherche">Recherche</NavLink></motion.li>

                {
                isRecruiter && (
                  <motion.li initial={animateFrom} animate={animateTo} transition={{ delay: 0.55 }} className="burgerMenu__items--item" onClick={closeMenu}><NavLink to="/favoris">Mes favoris</NavLink></motion.li>
                )
              }
                <motion.li initial={animateFrom} animate={animateTo} transition={{ delay: 0.65 }} className="burgerMenu__items--item" onClick={closeMenu}>Mes messages</motion.li>

                <motion.li
                  initial={animateFrom}
                  animate={animateTo}
                  transition={{ delay: 0.75 }}
                  className="burgerMenu__items--log"
                  onClick={
                    () => {
                      closeMenu();
                      dispatch(logout());
                    }
                  }
                >
                  <NavLink to="/">
                    Deconnexion
                  </NavLink>
                </motion.li>

              </>
            )
          }
            </motion.ul>

            )
        }
        </AnimatePresence>
        <div className="burgerMenu__opacity" onClick={() => dispatch(burgerMenuOpen())}> </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default BurgerMenu;

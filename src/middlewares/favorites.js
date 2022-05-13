import axios from 'axios';

import { RECRUITER_FAVORITES } from '../actions/middleware';
// import { registerDev } from '../actions/formRegisterDev';

/* export const initialState = {
  favoris: [],
}; */

const favorisFromApi = (store) => (next) => (action) => {
  switch (action.type) {
    case RECRUITER_FAVORITES: {
      const state = store.getState();
      const { id } = state.settings.log;

      console.log(id);

      axios
        .get(
          'http://aliciamv-server.eddi.cloud/projet-10-meet-dev-back/public/api/secure/favorites/recruiters',
          // ou url: 'http://localhost/api/users:8000',
          {
            params: {
              recrutId: 2,
              devId: 5,
            },
          },
        )
        .then((response) => {
          console.log(response.data);
          // store.dispatch(recruiterFavorites(response.data));
          console.log('favori récupéré');
        }).catch((error) => {
          console.log(error.response.data);
        });
      next(action);
      break;
    }

    default:
      next(action);
  }
};

export default favorisFromApi;
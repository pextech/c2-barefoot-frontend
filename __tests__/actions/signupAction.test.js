import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../src/redux/actions/signupRequestAction';
import * as types from "../../src/redux/actions/signupRequestAction";
import { user } from '../../dummyData'
import moxios from 'moxios'

const middlewares = [thunk]
const mockStore = configureStore(middlewares);

describe('Fetch Location actions', () => {
  let store;

  beforeEach(() => {
    moxios.install()
    store = mockStore({fetchLocations: {}})
  })
  afterEach(() => moxios.uninstall())

  it('Creates REQUEST_ERROR after task is successful', () => {

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
       status: 400,
       response: {
           error: "\"username\" length must be at least 5 characters long",
       }
          
       })
    })

    return store.dispatch(actions.requestSignup()).then(() => {
      const expectedActions = store.getActions();
      expect(expectedActions[0].type).toEqual('REQUEST_SIGNUP')
      expect(expectedActions[1].type).toEqual('REQUEST_ERROR')
    })
  })

  it('Creates REQUEST_SUCCESS after task is unsuccessful', () => {

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
       status: 200,
       response: {
          Message: "User M has been created. Check email for verification"
       }
       })
    })

    return store.dispatch(actions.requestSignup()).then(() => {
      const expectedActions = store.getActions();
      expect(expectedActions[0].type).toEqual('REQUEST_SIGNUP')
      expect(expectedActions[1].type).toEqual('REQUEST_SUCCESS')
    })
  })
  it('should dispatch the CLOSE_SNACKBAR action', () => {
    store.clearActions();
    store.dispatch(actions.closeSnackbar())
    expect(store.getActions()).toEqual([{"type": "CLOSE_SNACKBAR"}]);
   })

})
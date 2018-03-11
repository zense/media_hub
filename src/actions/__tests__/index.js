import { updateHosts, updateFileList } from 'actions/index';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// Create mock store
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// Mock lansharkClient module import
jest.mock('utils/lansharkClient');

// Tests for updateHosts action creator
describe('updateHosts action creator', () => {
  it(
    'should dispatch REQUEST_HOSTS before fetching host list and RECIEVE_HOSTS after fetching has been done',
    () => {
      // List of actions that have to be dispatched by updateHosts
      const expectedAction = [
        { type: 'REQUEST_HOSTS' },
        {
          type: 'RECIEVE_HOSTS',
          hostList: [
            ['hosts1', 'urlHost1'],
            ['hosts2', 'urlHost2'],
            ['hosts3', 'urlHost3'],
          ],
        },
      ];

      // Set initial state of store
      const store = mockStore({});

      // Dispatch updateHosts action
      store.dispatch(updateHosts()).then(() => {
        // Compare actions dispatched on updateHosts with expected action list
        expect(store.getActions()).toEqual(expectedAction);
      });
    },
  );
});

describe('updateFileList action creator', () => {
  it(
    'should dispatch REQUEST_FILE_LISTING before fetching data and RECIEVE_FILE_LISTING after fetching data',
    () => {
      const url = 'http://host1/dir1/';
      // List of actions that have to be dispatched by updateHosts
      const expectedAction = [
        { type: 'REQUEST_FILE_LISTING', url },
        {
          type: 'RECIEVE_FILE_LISTING',
          url,
          fileList: [
            [`${url}file1`, 500, null],
            [`${url}file2`, 500, null],
            [`${url}dir1/`, [2, 2], null],
            [`${url}dir2/`, [2, 2], null],
          ],
        },
      ];

      // Set initial state of store
      const store = mockStore({});

      // Dispatch updateFileList action
      store.dispatch(updateFileList(url)).then(() => {
        // Compare actions dispatched on updateHosts with expected action list
        expect(store.getActions()).toEqual(expectedAction);
      });
    },
  );
});

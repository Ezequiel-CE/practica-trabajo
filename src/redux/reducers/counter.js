const INCREMET = 'incremet';
const DECREMENT = 'decremet';

const initialState = { value: 0 };

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMET:
      return { value: state.value + 1 };
    case DECREMENT:
      return { value: state.value - 1 };
    default:
      return state;
  }
};

export const incremet = () => ({ type: INCREMET });
export const decrement = () => ({ type: DECREMENT });

export default counterReducer;

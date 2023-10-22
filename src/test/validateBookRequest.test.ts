import * as validators from '../middlewares/validateBookRequest';
import { ValidBookDto } from './test-data/book';
import { BadRequestError } from '../errors/BadRequestError';
import { validateRequiredFields } from '../middlewares/validateBookRequest';
describe('validateRequiredFields method', () => {
  const areRequiredFieldsPresentSpy = jest.spyOn(validators, 'areRequiredFieldsPresent');
  areRequiredFieldsPresentSpy.mockReturnValue(true);

  it('Should invoke areRequiredFieldsPresent with the correct params', () => {
    validateRequiredFields(ValidBookDto);

    expect(areRequiredFieldsPresentSpy).toBeCalledWith(ValidBookDto);
  });

  it('Should throw error in case areRequiredFieldsPresent returns false', () => {
    areRequiredFieldsPresentSpy.mockReturnValueOnce(false);

    void expect(() => {
      validateRequiredFields(ValidBookDto);
    }).toThrowError(BadRequestError);
  });
});

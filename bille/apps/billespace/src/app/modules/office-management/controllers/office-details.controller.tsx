/* eslint-disable @typescript-eslint/no-empty-function */
import { OfficePayload } from '@bille/billespace-services';
import {
  officeManagementActions,
  officeManagementSelect,
  useDispatch,
  useSelector,
} from '@bille/billespace-store';
import { Input, Select, SelectItem } from '@bille/ui';
import { LayoutComponent } from '../components';

const useOfficeDetails = () => {
  const dispatch = useDispatch();

  const form = useSelector(officeManagementSelect.form);
  const countries = useSelector(officeManagementSelect.countries);
  const country = useSelector(officeManagementSelect.country);
  const city = useSelector(officeManagementSelect.city);

  const set = <K extends keyof OfficePayload>(
    key: K,
    value: OfficePayload[K]
  ) => {
    dispatch(officeManagementActions.set({ key, value }));
  };

  const disabled =
    !!form.errors.address ||
    !!form.errors.postCode ||
    !!form.errors.cityId ||
    !!form.errors.countryId;

  return {
    form,
    countries,
    country,
    city,
    disabled,
    set,
  };
};

export const OfficeDetailsController = () => {
  const { disabled, country, countries, set, city, form } = useOfficeDetails();

  return (
    <LayoutComponent disabled={disabled}>
      <Select
        title="Select country"
        placeholder="Country*"
        value={country?.name ?? ''}
      >
        {countries.map((country, i) => (
          <SelectItem
            data-cy="country"
            key={`${country.name}-${i}`}
            motive="gray"
            onClick={() => set('countryId', country.id)}
          >
            <span>{country.name}</span>
          </SelectItem>
        ))}
      </Select>
      <Select
        disabled={country === undefined}
        title="Select city"
        placeholder="City*"
        value={city?.name ?? ''}
      >
        {(country?.cities ?? []).map(({ name, id }, i) => (
          <SelectItem
            key={`${name}-${i}`}
            motive="gray"
            data-cy="city"
            onClick={() => set('cityId', id)}
          >
            <span>{name}</span>
          </SelectItem>
        ))}
      </Select>
      <Input
        placeholder="Address*"
        data-cy="address-input"
        value={form.values.address}
        invalid={!!form.errors.address}
        onChange={(e) => set('address', e.target.value)}
      />
      <Input
        data-cy="post-code-input"
        placeholder="Post code*"
        value={form.values.postCode}
        invalid={!!form.errors.postCode}
        onChange={(e) => set('postCode', e.target.value)}
      />
    </LayoutComponent>
  );
};

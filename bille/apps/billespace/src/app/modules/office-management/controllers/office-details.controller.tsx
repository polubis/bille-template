/* eslint-disable @typescript-eslint/no-empty-function */
import { Input, Select, SelectItem } from '@bille/ui';
import { LayoutComponent } from '../components';
import {
  useOfficeManagementAction,
  useSafeOfficeManagementState,
} from '../logic';

export const OfficeDetailsController = () => {
  const { form, countries } = useSafeOfficeManagementState();
  const { set } = useOfficeManagementAction();

  const disabled =
    !!form.errors.address ||
    !!form.errors.postCode ||
    !!form.errors.cityId ||
    !!form.errors.countryId;

  const country = countries.find(({ id }) => id === form.values.countryId);
  const city = country?.cities.find((city) => city.id === form.values.cityId);

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

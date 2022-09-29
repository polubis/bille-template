import { Detail, Details } from '@bille/ui';
import styled from 'styled-components';
import { LayoutComponent } from '../components';
import {
  useOfficeManagementAction,
  useSafeOfficeManagementState,
} from '../logic';
import { sum, useRouteSearchParams } from '@bille/developer-kit';

const DetailContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  img {
    height: 19px;
    width: 100%;
    margin-right: 10px;
  }
`;

export const SummaryController = () => {
  const { finish } = useOfficeManagementAction();
  const { officeId } = useRouteSearchParams<{ officeId: string }>();
  const { form, countries } = useSafeOfficeManagementState();

  const desks = sum(form.values.officeZones, 'desks');
  const spaces = sum(form.values.parkingZones, 'spaces');
  const country = countries.find(({ id }) => id === form.values.countryId);
  const city = country?.cities.find((city) => city.id === form.values.cityId);

  return (
    <LayoutComponent onSubmit={() => finish(officeId)}>
      <Details>
        <Detail key={0} label="Country" value={country ? country.name : ''} />
        <Detail key={1} label="City" value={city ? city.name : ''} />
        <Detail key={2} label="Address" value={form.values.address} />
        <Detail key={3} label="Post code" value={form.values.postCode} />
        <Detail
          key={4}
          label="Office zones"
          value={(Value) => (
            <DetailContainer>
              {form.values.officeZones.map((zone, i, array) => (
                <Value key={`${zone.name}-${i}`}>
                  {i === array.length - 1 ? zone.name : `${zone.name},`}
                </Value>
              ))}
            </DetailContainer>
          )}
        />
        <Detail
          key={5}
          label="Parking zones"
          value={(Value) => (
            <DetailContainer>
              {form.values.parkingZones.map((zone, i, array) => (
                <Value key={`${zone.name}-${i}`}>
                  {i === array.length - 1 ? zone.name : `${zone.name},`}
                </Value>
              ))}
            </DetailContainer>
          )}
        />
        <Detail
          key={6}
          label="Total office desks"
          value={(Value) => <Value>{desks}</Value>}
        />
        <Detail
          key={7}
          label="Total parking spaces"
          value={(Value) => <Value>{spaces}</Value>}
        />
      </Details>
    </LayoutComponent>
  );
};

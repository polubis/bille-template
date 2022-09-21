import {
  getDesksSum,
  getOfficeManagementForm,
  getOfficeManagementSelectedCity,
  getOfficeManagementSelectedCountry,
  getSpacesSum,
  useSelector,
} from '@bille/billespace-store';
import { Detail, Details } from '@bille/ui';
import styled from 'styled-components';
import { LayoutComponent } from '../components';
import { useOfficeManagement } from '../facades';

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
  const { finish } = useOfficeManagement();
  const form = useSelector(getOfficeManagementForm);
  const city = useSelector(getOfficeManagementSelectedCity);
  const country = useSelector(getOfficeManagementSelectedCountry);
  const desksSum = useSelector(getDesksSum);
  const spacesSum = useSelector(getSpacesSum);

  if (!form || !country || !city) {
    throw new Error('Some properties are not available yet');
  }

  return (
    <LayoutComponent onSubmit={finish}>
      <Details>
        <Detail key={0} label="Country" value={country.name} />
        <Detail key={1} label="City" value={city.name} />
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
          value={(Value) => <Value>{desksSum}</Value>}
        />
        <Detail
          key={7}
          label="Total parking spaces"
          value={(Value) => <Value>{spacesSum}</Value>}
        />
      </Details>
    </LayoutComponent>
  );
};

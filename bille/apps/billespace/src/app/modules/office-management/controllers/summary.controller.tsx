import {
  officeManagementActions,
  officeManagementSelect,
  useDispatch,
  useSelector,
} from '@bille/billespace-store';
import { useRouteSearchParams } from '@bille/developer-kit';
import { Detail, Details } from '@bille/ui';
import styled from 'styled-components';
import { LayoutComponent } from '../components';

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

const useSummary = () => {
  const dispatch = useDispatch();

  const { officeId } = useRouteSearchParams<{ officeId: string }>();

  const form = useSelector(officeManagementSelect.form);
  const city = useSelector(officeManagementSelect.safeCity);
  const country = useSelector(officeManagementSelect.safeCountry);
  const desksSum = useSelector(officeManagementSelect.desksSum);
  const spacesSum = useSelector(officeManagementSelect.spacesSum);

  const finish = () => {
    dispatch(officeManagementActions.finish(officeId));
  };

  return {
    form,
    city,
    country,
    desksSum,
    spacesSum,
    finish,
  };
};

export const SummaryController = () => {
  const { form, city, country, desksSum, spacesSum, finish } = useSummary();

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

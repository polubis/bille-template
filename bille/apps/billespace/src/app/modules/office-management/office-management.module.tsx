import { StepsProvider } from '@bille/ui';
import { DetailsContainer } from './containers/details.container';

const CONTAINERS = [DetailsContainer];

const getContainer = (step: number) => CONTAINERS[step]();

const OfficeManagementModule = () => {
  return <StepsProvider maxStep={CONTAINERS.length} children={getContainer} />;
};

export { OfficeManagementModule };

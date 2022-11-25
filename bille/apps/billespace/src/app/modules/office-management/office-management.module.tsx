import { StepsProvider } from '@bille/ui';
import { DetailsController } from './controllers/details.controller';

const CONTROLLERS = [DetailsController];

const getContainer = (step: number) => CONTROLLERS[step]();

const OfficeManagementModule = () => {
  return <StepsProvider maxStep={CONTROLLERS.length} children={getContainer} />;
};

export { OfficeManagementModule };

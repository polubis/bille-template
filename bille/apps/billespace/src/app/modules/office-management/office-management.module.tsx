import { StepsProvider } from '@bille/ui';
import { DetailsController } from './controllers/details';
import { useManagementPrepare } from './facades';

const CONTROLLERS = [DetailsController];

const getContainer = (step: number) => CONTROLLERS[step]();

const OfficeManagementModule = () => {
  useManagementPrepare();

  return <StepsProvider maxStep={CONTROLLERS.length} children={getContainer} />;
};

export { OfficeManagementModule };

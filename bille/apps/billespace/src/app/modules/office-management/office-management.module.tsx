import {
  Country,
  createOffice,
  editOffice,
  loadCountries,
  OfficeZone,
  ParkingZone,
} from '@bille/billespace-services';
import {
  address,
  inRange,
  notEmpty,
  required,
  unique,
  useRouteSearchParams,
} from '@bille/developer-kit';
import {
  Alert,
  Center,
  DataItem,
  Detail,
  Details,
  ErrorScreen,
  Input,
  ItemList,
  Rocket,
  Select,
  SelectItem,
} from '@bille/ui';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  LayoutComponent,
  RangeSelectComponent,
  RangeSelectItem,
} from './components';
import { COUNTRIES } from './mocks';

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

type Screen =
  | 'details'
  | 'zones'
  | 'zonesCount'
  | 'spaces'
  | 'spacesCount'
  | 'summary';

interface State {
  preloading: boolean;
  preloadError: string | null;
  creating: boolean;
  created: boolean;
  creationError: string | null;
  editing: boolean;
  countries: Country[];
  edited: boolean;
  editionError: string | null;
}

interface FormData {
  postCode: string;
  address: string;
  countryId: string;
  cityId: string;
  zones: OfficeZone[];
  spaces: ParkingZone[];
}

type FormErrors = {
  [K in keyof FormData]: string;
};

export const OfficeManagementModule = () => {
  const { officeId } = useRouteSearchParams<{ officeId: string }>();
  const [screen, setScreen] = useState<Screen>('details');
  const isEditMode = !!officeId;
  const [state, setState] = useState<State>({
    preloading: !isEditMode,
    preloadError: null,
    creating: false,
    created: false,
    creationError: null,
    editing: false,
    edited: false,
    editionError: null,
    countries: [],
  });
  const [values, setValues] = useState<FormData>({
    postCode: '',
    address: '',
    countryId: '',
    cityId: '',
    zones: [],
    spaces: [],
  });
  const [errors, setErrors] = useState<FormErrors>({
    postCode: '',
    address: '',
    countryId: '',
    cityId: '',
    zones: '',
    spaces: '',
  });
  const [dirty, setDirty] = useState(false);

  const handleChange = <K extends keyof FormData>(
    key: K,
    value: FormData[K]
  ) => {
    const newValues = { ...values, [key]: value };
    const newErrors: FormErrors = {
      ...errors,
      cityId: required()(newValues.cityId),
      countryId: required()(newValues.countryId),
      address:
        [required()(newValues.address), address()(newValues.address)].find(
          (result) => result !== ''
        ) ?? '',
      postCode: required()(newValues.postCode),
    };

    setDirty(true);
    setErrors(newErrors);

    setValues(newValues);
    setErrors(newErrors);
  };

  const { preloading, creating, editing } = state;

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      preloading: true,
      preloadError: null,
      countries: [],
    }));

    const sub = loadCountries.mock(COUNTRIES).subscribe(
      ({ data }) => {
        setState((prevState) => ({
          ...prevState,
          preloading: false,
          preloadError: null,
          countries: data,
        }));
      },
      () => {
        setState((prevState) => ({
          ...prevState,
          countries: [],
          preloading: false,
          preloadError: 'Something went wrong',
        }));
      }
    );

    return () => {
      sub.unsubscribe();
    };
  }, []);

  if (preloading || editing || creating) {
    return (
      <Center>
        <Rocket size={256} />
      </Center>
    );
  }

  const { preloadError, creationError, editionError } = state;

  if (!!preloadError || !!creationError || !!editionError) {
    return (
      <Center>
        <ErrorScreen text="Something went wrong..." />
      </Center>
    );
  }

  const { created, edited } = state;

  if (created) {
    return (
      <Center>
        <Alert severity="success" message="Office created!" />
      </Center>
    );
  }

  if (edited) {
    return (
      <Center>
        <Alert severity="success" message="Edit done!" />
      </Center>
    );
  }

  const isDetailsStepInvalid = () => {
    return (
      !!errors.address ||
      !!errors.postCode ||
      !!errors.countryId ||
      !!errors.cityId
    );
  };

  const validateZones = () => {
    setErrors({
      ...errors,
      zones:
        [
          notEmpty()(values.zones),
          inRange(1, 100, 'desks')(values.zones),
          unique('name')(values.zones),
        ].find((error) => error !== '') ?? '',
    });
  };

  const handleNext = () => {
    if (screen === 'details') {
      setDirty(true);

      if (isDetailsStepInvalid()) {
        return;
      }

      setScreen('zones');
      return;
    }

    if (screen === 'zones') {
      if (errors.zones !== '') {
        return;
      }

      setScreen('zonesCount');
      return;
    }

    if (screen === 'zonesCount') {
      if (errors.zones !== '') {
        return;
      }

      setScreen('spaces');
      return;
    }

    if (screen === 'spaces') {
      if (errors.spaces !== '') {
        return;
      }

      setScreen('spacesCount');
      return;
    }

    if (screen === 'spacesCount') {
      if (errors.spaces !== '') {
        return;
      }

      setScreen('summary');
      return;
    }

    if (isEditMode) {
      setState({
        ...state,
        editing: true,
        editionError: null,
        edited: false,
      });

      editOffice(
        { id: officeId },
        {
          ...values,
          officeZones: values.zones,
          parkingZones: values.spaces,
        }
      ).subscribe(
        (res) => {
          setState({
            ...state,
            editing: false,
            editionError: null,
            edited: true,
          });
        },
        () => {
          setState({
            ...state,
            editing: false,
            edited: false,
            editionError: 'Something wrong with edition',
          });
        }
      );

      return;
    }

    setState({
      ...state,
      creating: true,
      created: false,
      creationError: null,
    });

    createOffice(null, {
      ...values,
      officeZones: values.zones,
      parkingZones: values.spaces,
    }).subscribe(
      (res) => {
        setState({
          ...state,
          created: true,
          creating: false,
          creationError: null,
        });
      },
      () => {
        setState({
          ...state,
          created: false,
          creating: false,
          creationError: 'Something wrong with edition',
        });
      }
    );
  };

  const validateSpaces = () => {
    setErrors({
      ...errors,
      spaces:
        [
          notEmpty()(values.spaces),
          inRange(1, 100, 'spaces')(values.spaces),
          unique('name')(values.spaces),
        ].find((error) => error !== '') ?? '',
    });
  };

  const addSpace = (name: string) => {
    setValues({
      ...values,
      spaces: [
        {
          name,
          id: (values.spaces.length + 1).toString(),
          spaces: 1,
        },
      ],
    });
    validateSpaces();
  };

  const changeSpace = (item: DataItem) => {
    setValues({
      ...values,
      spaces: values.spaces.map((space) =>
        space.id === item.id ? { ...space, ...item } : space
      ),
    });
    validateSpaces();
  };

  const deleteSpace = (id: string) => {
    setValues({
      ...values,
      spaces: values.spaces.filter((space) => space.id !== id),
    });
    validateSpaces();
  };

  const handleSpaceRangeChange = (item: RangeSelectItem) => {
    setValues({
      ...values,
      spaces: values.spaces.map((space) =>
        space.id === item.id ? { ...space, ...item } : space
      ),
    });
    validateSpaces();
  };

  const addZone = (name: string) => {
    setValues({
      ...values,
      zones: [
        {
          name,
          id: (values.zones.length + 1).toString(),
          desks: 1,
        },
      ],
    });
    validateZones();
  };

  const changeZone = (item: DataItem) => {
    setValues({
      ...values,
      zones: values.zones.map((zone) =>
        zone.id === item.id ? { ...zone, ...item } : zone
      ),
    });
    validateZones();
  };

  const deleteZone = (id: string) => {
    setValues({
      ...values,
      zones: values.zones.filter((zone) => zone.id !== id),
    });
    validateZones();
  };

  const handleZoneRangeChange = (item: RangeSelectItem) => {
    setValues({
      ...values,
      zones: values.zones.map((zone) =>
        zone.id === item.id ? { ...zone, ...item } : zone
      ),
    });
    validateZones();
  };

  const country = state.countries.find(
    (country) => country.id === values.countryId
  );
  const city = country?.cities.find((city) => city.id === values.cityId);

  if (screen === 'details') {
    const disabled = dirty && isDetailsStepInvalid();

    return (
      <LayoutComponent
        disabled={disabled}
        isFirst
        onNext={() => {}}
        onPrev={() => {}}
        onSubmit={handleNext}
      >
        <Select
          title="Select country"
          placeholder="Country*"
          value={country?.name ?? ''}
        >
          {state.countries.map((country, i) => (
            <SelectItem
              data-cy="country"
              key={`${country.name}-${i}`}
              motive="gray"
              onClick={() => handleChange('countryId', country.id)}
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
              onClick={() => handleChange('cityId', id)}
            >
              <span>{name}</span>
            </SelectItem>
          ))}
        </Select>
        <Input
          placeholder="Address*"
          data-cy="address-input"
          value={values.address}
          invalid={!!errors.address}
          onChange={(e) => handleChange('address', e.target.value)}
        />
        <Input
          data-cy="post-code-input"
          placeholder="Post code*"
          value={values.postCode}
          invalid={!!errors.postCode}
          onChange={(e) => handleChange('postCode', e.target.value)}
        />
      </LayoutComponent>
    );
  }

  if (screen === 'zones') {
    const disabled = dirty && !!errors.zones;

    return (
      <LayoutComponent
        disabled={disabled}
        onNext={() => {}}
        onSubmit={handleNext}
        onPrev={() => {
          setScreen('details');
        }}
      >
        <ItemList
          data={values.zones}
          onItemAdd={addZone}
          onChange={changeZone}
          onDeleteItem={deleteZone}
          placeholder="Type office zone name..."
        />
      </LayoutComponent>
    );
  }

  if (screen === 'zonesCount') {
    const disabled = dirty && !!errors.zones;

    const items = values.zones.map(
      ({ desks, ...officeZone }): RangeSelectItem => ({
        ...officeZone,
        count: desks,
      })
    );

    return (
      <LayoutComponent
        disabled={disabled}
        onPrev={() => {
          setScreen('zones');
        }}
        onNext={() => {}}
        onSubmit={handleNext}
      >
        <RangeSelectComponent
          items={items}
          min={1}
          max={100}
          onChange={handleZoneRangeChange}
        />
        <Detail
          label="all desks"
          value={'' + values.zones.reduce((acc, zone) => zone.desks + acc, 0)}
        />
      </LayoutComponent>
    );
  }

  if (screen === 'spaces') {
    const disabled = false;

    return (
      <LayoutComponent
        disabled={disabled}
        onPrev={() => {
          setScreen('spacesCount');
        }}
        onNext={() => {}}
        onSubmit={handleNext}
      >
        <ItemList
          data={values.spaces}
          onItemAdd={addSpace}
          onChange={changeSpace}
          onDeleteItem={deleteSpace}
          placeholder="Type parking space name..."
        />
      </LayoutComponent>
    );
  }

  if (screen === 'spacesCount') {
    const disabled = false;

    const items = values.spaces.map(
      ({ spaces, ...officeSpace }): RangeSelectItem => ({
        ...officeSpace,
        count: spaces,
      })
    );

    return (
      <LayoutComponent
        onPrev={() => {
          setScreen('summary');
        }}
        onNext={() => {}}
        onSubmit={handleNext}
      >
        <RangeSelectComponent
          items={items}
          min={1}
          max={100}
          onChange={handleSpaceRangeChange}
        />
        <Detail
          label="all spaces"
          value={
            '' + values.spaces.reduce((acc, space) => space.spaces + acc, 0)
          }
        />
      </LayoutComponent>
    );
  }

  if (screen === 'summary') {
    return (
      <LayoutComponent
        onPrev={() => {
          setScreen('spacesCount');
        }}
        isLast
        onSubmit={handleNext}
        onNext={() => {}}
      >
        <Details>
          <Detail key={0} label="Country" value={country?.name ?? ''} />
          <Detail key={1} label="City" value={city?.name ?? ''} />
          <Detail key={2} label="Address" value={values.address} />
          <Detail key={3} label="Post code" value={values.postCode} />
          <Detail
            key={4}
            label="Office zones"
            value={(Value) => (
              <DetailContainer>
                {values.zones.map((zone, i, array) => (
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
                {values.spaces.map((zone, i, array) => (
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
            value={(Value) => (
              <Value>
                {'' + values.zones.reduce((acc, space) => space.desks + acc, 0)}
              </Value>
            )}
          />
          <Detail
            key={7}
            label="Total parking spaces"
            value={(Value) => (
              <Value>
                {'' +
                  values.spaces.reduce((acc, space) => space.spaces + acc, 0)}
              </Value>
            )}
          />
        </Details>
      </LayoutComponent>
    );
  }

  return null;
};

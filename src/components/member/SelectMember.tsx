import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Select, { ControlProps, GroupBase, OnChangeValue, Props, StylesConfig, components } from 'react-select';
import { sendCompanyMembers } from '../../lib/api';
import useRequest from '../../lib/hooks/useRequest';
import { UserInfoState } from '../../modules/user';
import { RootState, useAppDispatch } from '../../store';

const customStyles: StylesConfig<UserInfoState> = {
  container: styles => ({ ...styles, width: '100%' }),
  control: styles => ({ ...styles, backgroundColor: 'transparent', width: '100%', border: 'none', boxShadow: 'none' }),
  option: (styles, { isDisabled, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isSelected ? '#DD0000' : undefined,
      color: isSelected ? 'white' : 'black',
      cursor: isDisabled ? 'not-allowed' : 'default',
    };
  },
  input: styles => ({ ...styles, color: 'white' }),
  menuList: styles => ({ ...styles, padding: 0, margin: 0, borderRadius: '4px' }),
  placeholder: styles => ({ ...styles, color: 'white' }),
  singleValue: styles => ({ ...styles, color: '#DD0000', textAlign: 'end' }),
};
const Control = ({ children, ...props }: ControlProps<UserInfoState, false>) => {
  return (
    <components.Control {...props}>
      <span>Who:</span>
      {children}
    </components.Control>
  );
};
type ReactSelectProps = Props<UserInfoState, false, GroupBase<UserInfoState>>;

export interface SelectClientProps extends ReactSelectProps {
  name?: string;
  value: UserInfoState | null;
  onChange: (client: UserInfoState | null) => void;
  fieldRef: any;
}

const SelectMember = ({ name, value, onChange, fieldRef, ...rest }: SelectClientProps) => {
  const [memberList, setMemberList] = React.useState<UserInfoState[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useSelector((state: RootState) => state.core);
  const { company_id } = useSelector((state: RootState) => state.companyInfo);
  const dispatch = useAppDispatch();

  const [_sendCompanyMembers, , sendCompanyMembersRes] = useRequest(sendCompanyMembers);

  React.useEffect(() => {
    setIsLoading(true);
    const user_id = user?.user_id;
    user_id && _sendCompanyMembers(user_id);
  }, []);
  React.useEffect(() => {
    if (sendCompanyMembersRes) {
      setMemberList(sendCompanyMembersRes.member);

      setIsLoading(false);
    }
  }, [sendCompanyMembersRes]);

  const handleChange = (newValue: OnChangeValue<UserInfoState, false>) => {
    onChange(newValue);
  };
  return (
    <div className='px-2'>
      <Select<UserInfoState>
        isClearable
        ref={fieldRef}
        name={name}
        isLoading={isLoading}
        options={memberList}
        components={{ Control }}
        value={value}
        getOptionValue={option => option.user_id.toString()}
        getOptionLabel={option => option.display_name}
        styles={customStyles}
        onChange={handleChange}
        blurInputOnSelect
        placeholder=''
        {...rest}
      />
    </div>
  );
};

export default SelectMember;

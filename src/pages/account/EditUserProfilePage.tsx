import React from 'react';
import MainTemplate from '../../components/main/MainTemplate';
import EditProfileContainer from '../../containers/account/EditProfileContainer';

function EditUserProfilePage() {
  return (
    <MainTemplate>
      <EditProfileContainer />
    </MainTemplate>
  );
}

export default EditUserProfilePage;

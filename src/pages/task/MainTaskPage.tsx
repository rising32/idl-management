import React from 'react';
import MainTemplate from '../../components/main/MainTemplate';
import MainTaskContainer from '../../containers/task/MainTaskContainer';

function MainTaskPage() {
  return (
    <MainTemplate>
      <MainTaskContainer />
    </MainTemplate>
  );
}

export default MainTaskPage;

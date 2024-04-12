import React from 'react';
import * as ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Popup } from '../UI';
import EditForm from '../EditForm/EditForm';

function EditFormPopup({
  isVisible, isSaving, name, item, onSaveChanges, onCancel,
}) {
  const editForm = (
    <EditForm
      name={name}
      item={item}
      onSaveChanges={onSaveChanges}
      onCancel={onCancel}
      isSaving={isSaving}
    />
  );

  const editFormPopup = (
    <Popup
      isVisible={isVisible}
      onClose={onCancel}
      element={editForm}
    />
  );

  const modalRoot = document.getElementById('modal');

  return (
    <>
      {ReactDOM.createPortal(editFormPopup, modalRoot)}
    </>
  );
}

EditFormPopup.defaultProps = {
  item: { id: '0', title: '' },
};

EditFormPopup.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  item: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
  }),
  onSaveChanges: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isSaving: PropTypes.bool.isRequired,
};

export default React.memo(EditFormPopup);

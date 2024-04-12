import { useState, useCallback } from 'react';

function useEditForm() {
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [editedItem, setEditedItem] = useState(null);

  const handleStartEditing = useCallback((item) => {
    setIsEditFormVisible(true);
    setEditedItem(item);
  }, []);

  const handleCancelEditing = useCallback(() => {
    setIsEditFormVisible(false);
    setEditedItem(null);
  }, []);

  return {
    isEditFormVisible,
    editedItem,
    handleStartEditing,
    handleCancelEditing,
  };
}

export default useEditForm;

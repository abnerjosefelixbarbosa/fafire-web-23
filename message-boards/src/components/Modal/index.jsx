import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react';

function ModalComponent({
  children,
  isOpen,
  onClose,
  title: modalTitle,
  secondaryButtonProps: { title, ...secondaryButtonProps } = {},
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{modalTitle}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>

        <ModalFooter>
          <Button variant='ghost' mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme='blue' {...secondaryButtonProps}>
            {title}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalComponent;

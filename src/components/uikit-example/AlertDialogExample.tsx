import { Container, Fullscreen, Text } from '@react-three/uikit';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  DialogAnchor,
  useDialogContext,
} from '@react-three/uikit-default';

export default function AlertDialogExample() {
  const {} = useDialogContext();

  return (
    <Fullscreen>
      <DialogAnchor>
        <AlertDialog>
          <AlertDialogTrigger>
            <Container
              width={'100%'}
              alignItems="center"
              justifyContent="center"
            >
              <Button
                variant="outline"
                backgroundColor={'white'}
                hover={{ backgroundColor: 'red' }}
              >
                <Text>Show Dialog</Text>
              </Button>
            </Container>
          </AlertDialogTrigger>
          <AlertDialogContent backgroundColor={'white'}>
            <AlertDialogHeader>
              <AlertDialogTitle>
                <Text>Are you absolutely sure?</Text>
              </AlertDialogTitle>
              <AlertDialogDescription>
                <Text>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </Text>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>
                <Text>Cancel</Text>
              </AlertDialogCancel>
              <AlertDialogAction>
                <Text>Continue</Text>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DialogAnchor>
    </Fullscreen>
  );
}

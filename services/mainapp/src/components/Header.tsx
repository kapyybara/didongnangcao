import { Appbar } from 'react-native-paper'

type Props = {
  title: string
  onBack: () => void
}

export default function Header({ title, onBack }: Props) {
  return (
    <Appbar.Header className='flex w-full'>
      <Appbar.BackAction onPress={onBack} />
      <Appbar.Content
        title={title}
        className='flex-1 flex flex-row justify-center'
      />
    </Appbar.Header>
  )
}

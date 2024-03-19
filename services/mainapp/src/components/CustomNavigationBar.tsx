import React, { useContext } from 'react'
import { Appbar, Menu } from 'react-native-paper'
import { getHeaderTitle } from '@react-navigation/elements'
import { HeaderContext } from '../contexts/header'

export default function CustomNavigationBar({
  navigation,
  route,
  options,
  back,
  ...rest
}: any) {
  const [visible, setVisible] = React.useState(false)
  const openMenu = () => setVisible(true)
  const closeMenu = () => setVisible(false)

  const title = getHeaderTitle(options, route.name)
  if (
    route.name == 'Login' ||
    route.name == 'SignUp' ||
    route.name == 'ForgetPassword' ||
    route.name == 'Home'
  )
    return <></>

  const { subfix } = useContext(HeaderContext)

  return (
    <Appbar.Header mode='center-aligned' className='flex justify-between'>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={title} className='text-center' />
      {!back ? (
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Appbar.Action icon='dots-vertical' onPress={openMenu} />}>
          <Menu.Item
            onPress={() => {
              console.log('Option 1 was pressed')
            }}
            title='Option 1'
          />
          <Menu.Item
            onPress={() => {
              console.log('Option 2 was pressed')
            }}
            title='Option 2'
          />
          <Menu.Item
            onPress={() => {
              console.log('Option 3 was pressed')
            }}
            title='Option 3'
            disabled
          />
        </Menu>
      ) : null}
      {subfix ? (
        <Appbar.Action icon={subfix.icon} onPress={subfix.onPress} />
      ) : (
        <></>
      )}
    </Appbar.Header>
  )
}

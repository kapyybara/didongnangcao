import { useContext, useEffect, useState } from 'react'
import { RefreshControl, ScrollView, View } from 'react-native'
import { Badge, Button, Card, Text } from 'react-native-paper'
import { readItems, updateItem } from '@directus/sdk'
import { GlobalContext } from '../../contexts/context'
import { directusInstance } from '../../services/directus'
import { calculateTimeAgo } from '../../utils/number'
import { NOTIFICATION_KEY } from '../../contants/schema-key.constant'

export default function Notification() {
    const [notifications, setNotifications] = useState([])
    const [refreshing, setRefreshing] = useState(false)

    const { user } = useContext(GlobalContext)
    

    useEffect(() => {
        ; (async () => {
            try {
                const res = await directusInstance.request(
                    readItems(NOTIFICATION_KEY, {
                        sort: ['-date_created'],
                        filter: {
                            user_id: user?.id
                        },
                    }),
                )
                setNotifications(res)

                await Promise.all(res.map(async (noti: any) => {
                    noti.is_read == false && await directusInstance.request(
                        updateItem(NOTIFICATION_KEY, noti.id, {
                            is_read: true
                        }),
                    )
                }))
                setRefreshing(false)

            } catch (error) {
                // console.log(error)
            }
        })()
    }, [refreshing])

    return (
        <ScrollView className='h-full w-full' refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => setRefreshing(true)} />} >
            <View className='w-full pt-2 gap-y-4 items-center pb-4'>

                {notifications.map((noti: any, index: number) => (
                    <Card id={index.toString()} className='p-4 w-[90%]' key={noti.id} >
                        <View className='w-full'>
                            <Text variant='titleMedium'>{noti.title}</Text>
                            <Text variant='bodyLarge'>{noti.message}</Text>
                            {noti.is_read ? <View className='flex flex-row justify-between items-center '>
                                <Text className=' text-right' variant='bodyMedium'>{calculateTimeAgo(new Date(noti.date_created))}</Text>
                                <Button className='text' icon="chevron-down-circle">Seen</Button>
                            </View> :
                                <Text className=' text-right' variant='bodyMedium'>{calculateTimeAgo(new Date(noti.date_created))}</Text>
                            }
                        </View>
                    </Card>
                ))}
            </View>

        </ScrollView>
    )
}

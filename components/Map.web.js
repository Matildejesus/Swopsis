import React, { useEffect, useState, useCallback } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Colors from '../constants/colors'

export default function Map({ apikey, postcode, groups }) {
  const [loading, setLoading] = useState(true)
  const [groupLocations, setGroupLocations] = useState({})
  const navigation = useNavigation()

  useEffect(() => {
    async function prepare() {
      try {
        const approved = (groups || []).filter(g => g.status === 'approve')
        const withCoords = await Promise.all(
          approved.map(async g => {
            const groupLocation = g.location.split(', ').pop()
            const res = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                groupLocation
              )},Victoria,Australia&key=${apikey}`
            )
            const data = await res.json()
            const loc = data?.results?.[0]?.geometry?.location
            if (loc && Math.abs(loc.lat) <= 90 && Math.abs(loc.lng) <= 180) {
              return { ...g, latitude: Number(loc.lat), longitude: Number(loc.lng) }
            }
            return null
          })
        )
        const grouped = withCoords.filter(Boolean).reduce((acc, g) => {
          const pc = g.location.split(',').pop().trim()
          acc[pc] = acc[pc] || []
          acc[pc].push(g)
          return acc
        }, {})
        setGroupLocations(grouped)
      } catch (e) {
        console.error('Map.web error', e)
      } finally {
        setLoading(false)
      }
    }
    prepare()
  }, [apikey, groups])

  const handlePress = useCallback(
    group => navigation.navigate('GroupDetails', { group }),
    [navigation]
  )

  if (loading) return <ActivityIndicator />

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Map not shown on web</Text>
      <Text style={styles.sub}>Select a group to open details or view on Google Maps</Text>

      {Object.entries(groupLocations).map(([pc, list]) => (
        <View key={pc} style={styles.section}>
          <Text style={styles.postcode}>{pc}</Text>
          {list.map(g => (
            <View key={`${pc}-${g.id}`} style={styles.row}>
              <Text style={styles.name}>{g.name}</Text>
              <View style={styles.actions}>
                <TouchableOpacity onPress={() => handlePress(g)} style={styles.btn}>
                  <Text style={styles.btnText}>Details</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => {
                    const q = `${g.latitude},${g.longitude}`
                    window.open(`https://www.google.com/maps/search/?api=1&query=${q}`, '_blank')
                  }}
                >
                  <Text style={styles.btnText}>Open map</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { gap: 12, padding: 12 },
  title: { fontSize: 16, fontWeight: '600' },
  sub: { color: '#666' },
  section: { marginTop: 8, gap: 6 },
  postcode: { fontWeight: '600' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { maxWidth: '55%' },
  actions: { flexDirection: 'row', gap: 8 },
  btn: { backgroundColor: Colors.primary1, paddingVertical: 6, paddingHorizontal: 10, borderRadius: 8 },
  btnText: { color: 'white' }
})

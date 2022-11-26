import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ImageBackground } from 'react-native'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
const PostPage = ({navigation}) => {
    const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent:"center",flexDirection: "column",backgroundColor: "#fafafa" }}>
    <View style={{width:"100%",justifyContent:"center",alignItems:"center",margin:15}}>
      <Card style={{ backgroundColor: "white", width: "90%" }}>
        <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
        <Card.Content>
          <Title>Card title</Title>
          <Paragraph>Card content</Paragraph>
        </Card.Content>
        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
        <Card.Actions>
          <Button>Cancel</Button>
          <Button>Ok</Button>
        </Card.Actions>
      </Card>
    </View>
    <View style={{width:"100%",justifyContent:"center",alignItems:"center",margin:15}}>
      <Card style={{ backgroundColor: "white", width: "90%" }}>
        <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
        <Card.Content>
          <Title>Card title</Title>
          <Paragraph>Card content</Paragraph>
        </Card.Content>
        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
        <Card.Actions>
          <Button>Cancel</Button>
          <Button>Ok</Button>
        </Card.Actions>
      </Card>
    </View>
  </View>
  )
}

export default PostPage
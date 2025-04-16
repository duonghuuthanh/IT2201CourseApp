import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import Apis, { endpoints } from "../../configs/Apis";
import { Card, List } from "react-native-paper";
import RenderHTML from "react-native-render-html";
import MyStyles from "../../styles/MyStyles";
import { Image } from "react-native";
import moment from "moment";
import 'moment/locale/vi';


const LessonDetails = ({route}) => {
    const lessonId = route.params?.lessonId;
    const [lesson, setLesson] = useState(null);
    const [loading, setLoading] = useState(false);
    const [comments, setComments] = useState([]);

    const loadLesson = async () => {
        try {
            setLoading(true);

            let res = await Apis.get(endpoints['lesson-details'](lessonId));
          
            setLesson(res.data);
            
        } catch {

        } finally {
            setLoading(false)
        }
    }

    const loadComments = async () => {
        console.info(Math.random());
        let res = await Apis.get(endpoints['comments'](lessonId));
        console.info(res.data)
        setComments(res.data);
    }

    useEffect(() => {
        loadComments();
        loadLesson();
        
    }, [lessonId]);

    return (
        <ScrollView>
            { lesson === null ? <ActivityIndicator />:<>
                <Card>
                    <Card.Cover source={{ uri: lesson.image }} />
                    <Card.Content>
                        <Text variant="titleLarge">{lesson.subject}</Text>
                        {/* <Text variant="bodyMedium">{lesson.content}</Text> */}
                        <RenderHTML source={{html: lesson.content}} />
                    </Card.Content>
                </Card>
            </>}

            <View>
                {comments.map(c => <List.Item title={c.content} description={moment(c.created_date).fromNow()} 
                left={() => <Image style={MyStyles.avatar} source={{uri: c.user.avatar}} />} />)}
            </View>
        </ScrollView>
    );
}

export default LessonDetails;
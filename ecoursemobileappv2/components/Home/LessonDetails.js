import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import Apis, { endpoints } from "../../configs/Apis";
import { Card } from "react-native-paper";
import RenderHTML from "react-native-render-html";

const LessonDetails = ({ route }) => {
    const [lesson, setLesson] = useState(null);
    const lessonId = route.params?.lessonId;

    const loadLesson = async () => {
        let res = await Apis.get(endpoints['lesson-details'](lessonId));
        setLesson(res.data);
    }

    useEffect(() => {
        console.info(Math.random());
        loadLesson();
    }, [lessonId]);

    return (
        <ScrollView>
            {lesson === null?<ActivityIndicator />:<>
                <Card>
                    <Card.Title subtitle={lesson.subject} />
                    <Card.Cover source={{ uri: lesson.image }} />
                    <Card.Content>
                        <RenderHTML source={{html:lesson.content}} />
                    </Card.Content>
                    
                    
                </Card>
            </>}
        </ScrollView>
    );
}

export default LessonDetails;
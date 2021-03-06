import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { RootState } from '../store';
import formatTime from '../utils/formatTime';
import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonContent, IonTitle } from '@ionic/react';
import './SessionDetail.css';

type Props = RouteComponentProps<{ id: string, tab: string }> & ReturnType<typeof mapStateToProps> & {
  goBack: () => void
};

const SessionDetail: React.SFC<Props> = ({ sessions, speakers, match, goBack }) => {
  const session = sessions.find(s => s.id === parseInt(match.params.id, 10));
  if (session == null) {
    return null;
  }
  const sessionSpeakers = speakers.filter(s => session.speakerIds.indexOf(s.id) !== -1);

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={`/${match.params.tab}`} />
          </IonButtons>
          <IonTitle>{session.name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div>
          <h1>{session.name}</h1>
          {sessionSpeakers.map(speaker => (
            <h4 key={speaker.name}>
              {speaker.name}
            </h4>
          ))}
          <p>

            {formatTime(session.dateTimeStart, "D/M HH:mm")} &mdash;&nbsp;
            {formatTime(session.dateTimeEnd, "HH:mm")}
          </p>
          <p>{session.location}</p>
          <p>{session.description}</p>
        </div>
      </IonContent>
    </>
  );
}

const mapStateToProps = (state: RootState) => ({
  sessions: state.sessions.sessions,
  speakers: state.speakers.speakers
});

export default connect(
  mapStateToProps
)(SessionDetail)

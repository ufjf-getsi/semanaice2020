import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RootState, selectors } from '../store';
import { IonPopover, IonIcon, IonSelect, IonSelectOption, IonHeader, IonToolbar, IonButtons, IonButton, IonMenuButton, IonContent, IonList, IonItem, IonLabel, IonDatetime, IonTitle } from '@ionic/react';
import './About.css';
import AboutPopover from '../components/AboutPopover';
import { calendar, pin } from 'ionicons/icons';

type Props = ReturnType<typeof mapStateToProps>

type State = {
  showPopover: boolean,
  showPopoverEvent: null | MouseEvent
}

class About extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      showPopover: false,
      showPopoverEvent: null
    };
  }

  presentPopover = (e: MouseEvent) => {
    this.setState(() => ({
      showPopover: true,
      showPopoverEvent: e
    }));
  }

  dismissPopover = () => {
    this.setState(() => ({
      'showPopover': false,
      'showPopoverEvent': null
    }));
  }

  render() {
    return (
      <>
        <IonHeader>
          <IonToolbar color="primary">
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>Sobre</IonTitle>
            <IonButtons slot="end">
              <IonButton icon-only onClick={this.presentPopover}>
                <IonIcon slot="icon-only" name="more"></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonPopover
          isOpen={this.state.showPopover}
          event={this.state.showPopoverEvent}
          onDidDismiss={this.dismissPopover}
        >
          <AboutPopover
            dismissPopover={this.dismissPopover}
          />
        </IonPopover>

        <IonContent>
          <div className="about-header">
            <img src="assets/img/ice.jpg" alt="ICE UFJF Logo" />
          </div>
          <div className="ion-padding about-info">
            <h4>Semana do ICE</h4>

            {/*<IonList lines="none">
              <IonItem>
                <IonIcon icon={calendar} slot="start"></IonIcon>
                <IonLabel>Date</IonLabel>
                <IonDatetime displayFormat="MMM DD, YYYY" max="2056" value={this.props.conferenceDate}></IonDatetime>
              </IonItem>

              <IonItem>
                <IonIcon icon={pin} slot="start"></IonIcon>
                <IonLabel>Location</IonLabel>
                <IonSelect>
                  <IonSelectOption value="madison" selected>Madison, WI</IonSelectOption>
                  <IonSelectOption value="austin">Austin, TX</IonSelectOption>
                  <IonSelectOption value="chicago">Chicago, IL</IonSelectOption>
                  <IonSelectOption value="seattle">Seattle, WA</IonSelectOption>
                </IonSelect>
              </IonItem>
            </IonList>*/}

            <p>
            A semana do ICE acontece anualmente há mais de 20 anos na Universidade Federal de Juiz de Fora (UFJF), sempre durante a Semana Nacional de Ciência e Tecnologia e apresenta programações específicas das semanas dos departamentos que fazem parte do Instituto (Computação, Matemática, Física, Química e Estatística) que promovem palestras, minicursos, uma Feira de Ciências e mais. O objetivo do evento é proporcionar aos alunos contato com o universo científico e profissional desta área de conhecimento, despertando neles o interesse pela inovação.
A Semana do ICE é destinada aos alunos de Exatas pelas especificidades dos temas, no entanto, as atividades são abertas a toda comunidade acadêmica e aos estudantes de outras instituições.
            </p>
          </div>
        </IonContent>
      </>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  conferenceDate: selectors.sessions.conferenceStart(state.sessions),
});

export default connect(
  mapStateToProps
)(About);

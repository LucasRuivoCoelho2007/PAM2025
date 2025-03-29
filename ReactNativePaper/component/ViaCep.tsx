import { useState } from 'react';
import * as React from 'react';
import { ScrollView } from 'react-native';
import { Text, TextInput, Button, Modal, Portal, PaperProvider, List } from 'react-native-paper';

const ViaCep = () => {
    let [cep, setCep] = useState("");
    let [dados, setDados] = useState({});
    const [expanded, setExpanded] = useState(false);
    const handlePress = () => setExpanded(!expanded);
    const [selectedValue, setSelectedValue] = useState(null);
    const [visible, setVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const handleItemPress = (value) => {
        setSelectedValue(value);
        setExpanded(false);
    }

    const BuscaCep = (cep) => {
        let url = `https://viacep.com.br/ws/${cep}/json/`;
        fetch(url)
            .then((resp) => resp.json())
            .then((dados) => {
                setDados(dados);
                setSelectedValue(dados.uf);
            })
            .catch((error) => console.log("Erro: " + error));
    }

    const handleConcluir = () => {
        if (!cep || !selectedValue) {
            setModalMessage("Preencha os campos");
        } else {
            setModalMessage("Concluído!");
            setCep("");
            setDados({});
            setSelectedValue(null);
        }
        showModal();
    }

    return (
        <PaperProvider>
            <ScrollView >
                <Text style={{ color: '#0f9' }} variant='displayLarge'>Via CEP Rest</Text>
                <Text> </Text>
                <Text style={{ color: 'white' }}>Login</Text>
                <TextInput
                    label='Nome'
                    mode='outlined'
                    textColor='#0fa'
                    outlineColor='#fff'
                    activeOutlineColor='#fff'
                    style={{ backgroundColor: '#111' }}
                />
                <TextInput
                    label='email'
                    mode='outlined'
                    textColor='#0fa'
                    outlineColor='#fff'
                    activeOutlineColor='#fff'
                    style={{ backgroundColor: '#111' }}
                />
                <Text> </Text>
                <Text style={{ color: 'white'}}>CEP</Text>
                <TextInput
                    label='CEP'
                    onChangeText={(value) => { setCep(value) }}
                    onBlur={() => { BuscaCep(cep) }}
                    keyboardType='numeric'
                    mode='outlined'
                    textColor='#0fa'
                    outlineColor='#fff'
                    activeOutlineColor='#fff'
                    style={{ backgroundColor: '#111' }}
                    value={cep}
                />
                <TextInput
                    label='Rua'
                    value={dados.logradouro || ''}
                    onChangeText={(value) => { setCep(dados.logradouro = value) }}
                    mode='outlined'
                    textColor='#0fa'
                    outlineColor='#fff'
                    activeOutlineColor='#fff'
                    style={{ backgroundColor: '#111' }}
                />
                <TextInput
                    label='Bairro'
                    value={dados.bairro || ''}
                    onChangeText={(value) => { setCep(dados.bairro = value) }}
                    mode='outlined'
                    textColor='#0fa'
                    outlineColor='#fff'
                    activeOutlineColor='#fff'
                    style={{ backgroundColor: '#111' }}
                />
                <TextInput
                    label='Numero'
                    value={dados.unidade || ''}
                    onChangeText={(value) => { setCep(dados.unidade = value) }}
                    mode='outlined'
                    textColor='#0fa'
                    outlineColor='#fff'
                    activeOutlineColor='#fff'
                    style={{ backgroundColor: '#111' }}
                />
                <TextInput
                    label='Complemento'
                    value={dados.complemento || ''}
                    onChangeText={(value) => { setCep(dados.complemento = value) }}
                    mode='outlined'
                    textColor='#0fa'
                    outlineColor='#fff'
                    activeOutlineColor='#fff'
                    style={{ backgroundColor: '#111' }}
                />
                <TextInput
                    label='Cidade'
                    value={dados.localidade || ''}
                    onChangeText={(value) => { setCep(dados.localidade = value) }}
                    mode='outlined'
                    textColor='#0fa'
                    outlineColor='#fff'
                    activeOutlineColor='#fff'
                    style={{ backgroundColor: '#111' }}
                />

                <List.Section titleStyle={{ color: 'white' }} title="Estado:">
                    <List.Accordion
                        style={{ backgroundColor: '#111' }}
                        title={selectedValue ? selectedValue : 'Selecione o Estado'}
                        titleStyle={{ color: 'white' }}
                        left={props => <List.Icon {...props} icon="folder" color='white' />}
                        expanded={expanded}
                        onPress={handlePress}>
                        {"AC,AL,AM,AP,BA,CE,DF,ES,GO,MA,MG,MS,MT,PA,PB,PE,PI,PR,RJ,RN,RO,RR,RS,SC,SE,SP,TO".split(",").map(estado => (
                            <List.Item 
                                key={estado} 
                                title={estado} 
                                titleStyle={{ color: 'white' }} 
                                style={{ backgroundColor: '#555' }} 
                                onPress={() => handleItemPress(estado)} 
                            />
                        ))}
                    </List.Accordion>
                </List.Section>
                
                <Button 
                    icon="arrow-right-bold-circle" 
                    uppercase={true} 
                    mode="outlined" 
                    textColor="#0fa" 
                    buttonColor="#222" 
                    onPress={handleConcluir}>
                    Concluir
                </Button>
            </ScrollView>

            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={{ backgroundColor: 'white', padding: 20 }}>
                    <Text style={{ color: '#000' }}>{modalMessage}</Text>
                    <Button 
                        mode="outlined" 
                        icon="check-circle" 
                        uppercase={true} 
                        textColor="#0fa" 
                        buttonColor="#222"
                        onPress={hideModal}>
                        OK
                    </Button>
                </Modal>
            </Portal>
        </PaperProvider>
    );
}

export default ViaCep;
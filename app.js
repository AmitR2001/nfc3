document.getElementById('writeButton').addEventListener('click', async () => {
    const fullName = document.getElementById('full_name').value;
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const bloodType = document.getElementById('blood_type').value;
    const allergies = document.getElementById('allergies').value;
    const chronicConditions = document.getElementById('chronic_conditions').value;
    const currentMedications = document.getElementById('current_medications').value;
    const emergencyContact = document.getElementById('emergency_contact').value;
    const immunizationRecords = document.getElementById('immunization_records').value;

    const message = `
        Basic Patient Information
        FullName: ${fullName}
        Age: ${age}
        Gender: ${gender}
        BloodType: ${bloodType}

        Allergies: ${allergies}
        Chronic Conditions: ${chronicConditions}
        Current Medications: ${currentMedications}
        Emergency Contact: ${emergencyContact}
        Immunization Records: ${immunizationRecords}
    `;

    if ('NDEFReader' in window) {
        try {
            const ndef = new NDEFReader();
            await ndef.write(message).then(() => {
                document.getElementById('message').textContent = 'Message written.';
            }).catch(error => {
                document.getElementById('message').textContent = `Write failed :-( try again: ${error}.`;
            });
        } catch (error) {
            document.getElementById('message').textContent = `Error: ${error}`;
        }
    } else {
        document.getElementById('message').textContent = 'Web NFC is not supported on this device.';
    }
});

document.getElementById('readButton').addEventListener('click', async () => {
    if ('NDEFReader' in window) {
        try {
            const ndef = new NDEFReader();
            await ndef.scan();
            ndef.onreading = event => {
                const decoder = new TextDecoder();
                for (const record of event.message.records) {
                    document.getElementById('message').textContent = `NFC Tag contains: ${decoder.decode(record.data)}`;
                }
            };
        } catch (error) {
            document.getElementById('message').textContent = `Error: ${error}`;
        }
    } else {
        document.getElementById('message').textContent = 'Web NFC is not supported on this device.';
    }
});

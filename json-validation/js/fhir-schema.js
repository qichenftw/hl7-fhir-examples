exports.patient = {
    definitions: {
        DateTime: {
            id: 'DateTime',
            type: 'string',
            oneOf: [
                {format: 'anything'},     // FIXME: there's a bug: https://github.com/natesilva/jayschema/issues/19
                {format: 'date-time'}
            ]
        },
        URI: {
            id: 'URI',
            type: 'string',
            format: 'uri'
        },
        ArrayOfString: {
            id: 'ArrayOfString',
            type: 'array',
            items: {type: 'string'}
        },
        Extension: {
            id: 'Extension',
            type: 'object',
            properties: {
                value: {type: 'any'}
            }
        },
        ValueSet: {
            id: 'ValueSet',
            type: 'object'
            // TODO: unimplemented yet
        },
        Code: {
            id: 'Code',
            type: 'string'
            // TODO: Code specific validation logic
        },
        Coding: {
            id: 'Coding',
            properties: {
                system: {'$ref': 'URI'},
                version: {type: 'string'},
                code: {'$ref': 'Code'},
                display: {type: 'string'},
                primary: {type: 'boolean'},
                valueSet: {'$ref': 'ValueSet'}
            }
        },
        CodeableConcept: {
            id: 'CodeableConcept',
            type: 'object',
            properties: {
                coding: {
                    type: 'array',
                    items: {'$ref': 'Coding'}
                },
                text: {type: 'string'}
            }
        },
        Period: {
            id: 'Period',
            type: 'object',
            properties: {
                start: {'$ref': 'DateTime'},
                end: {'$ref': 'DateTime'}
            }
        },
        Organization: {
            id: 'Organization',
            type: 'object'
            // TODO: unimplemented
        },
        Identifier: {
            id: 'Identifier',
            type: 'object',
            properties: {
                use: {'$ref': 'Code'},
                label: {type: 'string'},
                system: {'$ref': 'URI'},
                value: {type: 'string'},
                period: {'$ref': 'Period'},
                assigner: {'$ref': 'Organization'}
            }
        },
        HumanName: {
            id: 'HumanName',
            properties: {
                use: {'$ref': 'Code'},
                text: {type: 'text'},
                family: {'$ref': 'ArrayOfString'},
                given: {'$ref': 'ArrayOfString'},
                prefix: {'$ref': 'ArrayOfString'},
                suffix: {'$ref': 'ArrayOfString'},
                period: {'$ref': 'Period'}
            }
        },
        Contact: {
            id: 'Contact',
            type: 'object',
            properties: {
                system: {'$ref': 'Code'},
                value: {type: 'string'},
                use: {'$ref': 'Code'},
                period: {'$ref': 'Period'}
            }
        },
        Address: {
            id: 'Address',
            type: 'object',
            properties: {
                use: {'$ref': 'Code'},
                text: {type: 'string'},
                line: {
                    type: 'array',
                    items: {type: 'string'}
                },
                city: {type: 'string'},
                state: {type: 'string'},
                zip: {type: 'string'},
                country: {type: 'string'},
                period: {'$ref': 'Period'}
            }
        },
        Language: {
            id: 'Language',
            '$ref': 'CodeableConcept'
        },
        AdministrativeGender: {
            id: 'AdministrativeGender',
            '$ref': 'CodeableConcept'
        },
        MaritalStatus: {
            id: 'MaritalStatus',
            '$ref': 'CodeableConcept'
        },
        ContactRelationship: {
            id: 'ContactRelationship',
            '$ref': 'CodeableConcept'
        },
        Attachment: {
            id: 'Attachment',
            type: 'object',
            properties: {
                //TODO: unimplemented yet
            }
        },
        ContactPerson: {
            id: 'ContactPerson',
            type: 'object',
            properties: {
                relationship: {
                    type: 'array',
                    items: {'$ref': 'ContactRelationship'}
                },
                name: {'$ref': 'HumanName'},
                telecom: {
                    type: 'array',
                    items: {'$ref': 'Contact'}
                },
                address: {'$ref': 'Address'},
                gender: {'$ref': 'AdministrativeGender'},
                organization: {'$ref': 'Organization'}
            }
        },
        Patient: {
            id: 'Patient',
            type: 'object',
            properties: {
                identifier: {
                    type: 'array',
                    minItems: 1,
                    items: {'$ref': 'Identifier'}
                },
                name: {
                    type: 'array',
                    items: {'$ref': 'HumanName'}
                },
                telecom: {
                    type: 'array',
                    items: {'$ref': 'Contact'}
                },
                gender: {'$ref': 'AdministrativeGender'},
                birthDate: {'$ref': 'DateTime'},
                deceased: {
                    oneOf: [
                        {type: 'boolean'},
                        {'$ref': 'DateTime'}
                    ]
                },
                address: {
                    type: 'array',
                    items: {'$ref': 'Address'}
                },
                maritalStatus: {'$ref': 'MaritalStatus'},
                multipleBirth: {
                    oneOf: [
                        {type: 'boolean'},
                        {type: 'integer'}
                    ]
                },
                photo: {'$ref': 'Attachment'},
                communication: {
                    type: 'array',
                    items: {'$ref': 'Language'}
                },
                careProvider: {
                    oneOf:[
                        {'$ref': 'Organization'},
                        {'$ref': 'Practitioner'}
                    ]
                },
                managingOrganization: {'$ref': 'Organization'},
                active: {type: 'boolean'},
                // TODO: Animal
                // TODO: Link
                contact: {
                    type: 'array',
                    items: {'$ref': 'ContactPerson'}
                }
            }
        }
    },
    '$ref': 'Patient'
};
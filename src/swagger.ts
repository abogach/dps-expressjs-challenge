export const swaggerDocument = {
    openapi: '3.0.0',
    info: {
        title: 'DPS Backend API',
        version: '1.0.0',
        description: 'API for managing projects and the reports from these projects'
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            }
        },
        schemas: {
            Project: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                        description: 'Project ID'
                    },
                    name: {
                        type: 'string',
                        description: 'Project Name'
                    },
                    description: {
                        type: 'string',
                        description: 'Project Description'
                    }
                }
            },
            ProjectInput: {
                type: 'object',
                required: ['name'],
                properties: {
                    name: {
                        type: 'string',
                        description: 'Project Name'
                    },
                    description: {
                        type: 'string',
                        description: 'Project Description'
                    }
                }
            },
            Report: {
                type: 'object',
                properties: {
                    id: {
                        type: 'integer',
                        description: 'Report ID'
                    },
                    project_id: {
                        type: 'integer',
                        description: 'Associated Project ID'
                    },
                    content: {
                        type: 'string',
                        description: 'Report Content'
                    }
                }
            },
            ReportInput: {
                type: 'object',
                required: ['project_id', 'content'],
                properties: {
                    project_id: {
                        type: 'integer',
                        description: 'Associated Project ID'
                    },
                    content: {
                        type: 'string',
                        description: 'Report Content'
                    }
                }
            }
        }
    },
    security: [{
        bearerAuth: []
    }],
    paths: {
        '/api/projects': {
            get: {
                tags: ['Projects'],
                summary: 'Get all projects',
                responses: {
                    '200': {
                        description: 'Success: List of all projects',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        $ref: '#/components/schemas/Project'
                                    }
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags: ['Projects'],
                summary: 'Create a new project',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/ProjectInput'
                            }
                        }
                    }
                },
                responses: {
                    '201': {
                        description: 'Success: Project created successfully',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Project'
                                }
                            }
                        }
                    }
                }
            }
        },
        '/api/projects/{id}': {
            get: {
                tags: ['Projects'],
                summary: 'Get a project by ID',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string'
                        }
                    }
                ],
                responses: {
                    '200': {
                        description: 'Success: Project found',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Project'
                                }
                            }
                        }
                    },
                    '404': {
                        description: 'Error: Project not found'
                    }
                }
            },
            put: {
                tags: ['Projects'],
                summary: 'Update a project',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string'
                        }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/ProjectInput'
                            }
                        }
                    }
                },
                responses: {
                    '200': {
                        description: 'Success: Project updated successfully'
                    },
                    '404': {
                        description: 'Error: Project not found'
                    }
                }
            },
            delete: {
                tags: ['Projects'],
                summary: 'Delete a project',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string'
                        }
                    }
                ],
                responses: {
                    '200': {
                        description: 'Success: Project deleted successfully'
                    },
                    '404': {
                        description: 'Error: Project not found'
                    }
                }
            }
        },
        '/api/reports': {
            get: {
                tags: ['Reports'],
                summary: 'Get all reports',
                responses: {
                    '200': {
                        description: 'Success: List of all reports',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        $ref: '#/components/schemas/Report'
                                    }
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags: ['Reports'],
                summary: 'Create a new report',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/ReportInput'
                            }
                        }
                    }
                },
                responses: {
                    '201': {
                        description: 'Success: Report created successfully',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Report'
                                }
                            }
                        }
                    }
                }
            }
        },
        '/api/reports/{id}': {
            get: {
                tags: ['Reports'],
                summary: 'Get a report by ID',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string'
                        }
                    }
                ],
                responses: {
                    '200': {
                        description: 'Success: Report found',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Report'
                                }
                            }
                        }
                    },
                    '404': {
                        description: 'Error: Report not found'
                    }
                }
            },
            put: {
                tags: ['Reports'],
                summary: 'Update a report',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string'
                        }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/ReportInput'
                            }
                        }
                    }
                },
                responses: {
                    '200': {
                        description: 'Success: Report updated successfully'
                    },
                    '404': {
                        description: 'Error: Report not found'
                    }
                }
            },
            delete: {
                tags: ['Reports'],
                summary: 'Delete a report',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'string'
                        }
                    }
                ],
                responses: {
                    '200': {
                        description: 'Success: Report deleted successfully'
                    },
                    '404': {
                        description: 'Error: Report not found'
                    }
                }
            }
        },
        '/api/reports/reports/repeated-words': {
            get: {
                tags: ['Reports'],
                summary: 'Get reports with words that appear at least three times',
                responses: {
                    '200': {
                        description: 'Success: List of reports with repeated words',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        $ref: '#/components/schemas/Report'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}; 
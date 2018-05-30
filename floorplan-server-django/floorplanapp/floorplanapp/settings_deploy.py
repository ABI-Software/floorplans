from floorplanapp.settings_local import *

DEBUG = False

# Add this middleware for allowing the front end hosted on dev server to access the APIs.
MIDDLEWARE.remove('fpsapi.middleware.dev_cors_middleware')

# Disable browsable API in production.
REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': (
        'rest_framework.renderers.JSONRenderer',
    )
}

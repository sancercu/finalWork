from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import routers
from podcasts.views import PodcastViewSet, CommentViewSet

# Instanciamos el router de REST Framework
router = routers.DefaultRouter()
# Definimos la URL de acceso para la API de Podcasts
router.register('podcasts', PodcastViewSet)
# Definimos la URL de acceso para la API de Comments
router.register('comments', CommentViewSet)

urlpatterns = [
    # Incluimos las URLs de la API
    path('api/v1/', include(router.urls)),
    # Incluimos las URLs de rest_auth
    path('rest-auth/', include('rest_auth.urls')),
    path('admin/', admin.site.urls),
] + static( # Agregamos las rutaas para enrutar los uploads desde el servidor de desarrollo
    settings.MEDIA_URL, document_root=settings.MEDIA_ROOT
)

from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework import authentication, permissions
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.shortcuts import get_object_or_404
from django.core.exceptions import ObjectDoesNotExist
from .serializers import PodcastSerializer, CommentSerializer, LikeSerializer
from .models import Podcast, Like, Comment
from .permissions import IAmMe

# ViewSet for Podcast
class PodcastViewSet(viewsets.ReadOnlyModelViewSet):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    # QuerySet para listar todos los snippets habilitados
    queryset = Podcast.objects.filter(enabled=True)
    # Definimos que serializador usar
    serializer_class = PodcastSerializer
    # Definimos el uso de un filtro SearchFilter y además OrderingFilter
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    # Definimo un SearchFilter por todos los campos
    search_fields = ('title', 'album', 'author')
    # Definimos un orden por defecto
    ordering = ('-created', 'title')
    # Habilitamos para que se pueda ordenar por los campos 'created' y 'title'
    ordering_fields = ('created', 'title', 'likes_amount')

    @action(
        detail=True,
        methods=['post', 'delete'],
        authentication_classes=[authentication.TokenAuthentication],
        permission_classes=[permissions.IsAuthenticated]
    )
    def likes(self, request, pk=None):
        podcast = get_object_or_404(Podcast, pk=pk)

        like = None
        try:
            # Intentamos recuperar el like del usuario en sesion para el podcast en cuestion
            like = Like.objects.get(user=request.user.id, podcast=pk)
        except ObjectDoesNotExist:
            pass

        if request.method == 'POST':
            # Si intentamos crear mas de un like retornamos un 400
            if like is not None:
                return Response("Bad request", status=400)

            # Increment likes amounr
            podcast.likes_amount += 1
            podcast.save()

            # Agregamos un like del usuario al podcast
            like = Like(user=request.user, podcast=podcast)
            like.save()
            likeSerializer = LikeSerializer(like)

            return Response(likeSerializer.data, status=201)
        else:
            # Si intentamos eliminar un like que no existe retornamos un 400
            if like is None:
                return Response("Bad request", status=400)

            # Decrement likes amounr
            podcast.likes_amount -= 1
            podcast.save()
            
            # Eliminamos el like
            like.delete()

            return Response({}, status=200)

# ViewSet for Comments
class CommentViewSet(viewsets.ModelViewSet):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [IAmMe, permissions.IsAuthenticatedOrReadOnly]
    # QuerySet para listar todos los snippets habilitados
    queryset = Comment.objects.all()
    # Definimos que serializador usar
    serializer_class = CommentSerializer
    # Definimos el uso de un filtro OrderingFilter
    filter_backends = (DjangoFilterBackend, filters.OrderingFilter)
    # Allow filter by podcast id
    filter_fields = ('podcast',)
    # Definimos un orden por defecto
    ordering = ('-created',)
from rest_framework.permissions import BasePermission

# Permiso para impedir que cualquier usuario comente en nombre de otro usuario
class IAmMe(BasePermission):
    def has_permission(self, request, view):
        # Solo permite que se reguperen los comentarios o se agreguen pero no que se eliminen ni que se modifiquen
        if request.method != 'POST' and request.method != 'GET':
            return False
        # Si se esta agregando un comentario
        if (request.method == 'POST'):
            # Valida que el usuario de la sesion cree el comentario en nombre de el y no de cualquier otro
            return request.data.get('user') == request.user.id
        return True
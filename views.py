from django.db.models import Q
from rest_framework import viewsets

from .models import Record
from .serializers import RecordSerializer


class RecordViewSet(viewsets.ModelViewSet):
    """
    Full CRUD for student/employee records.

    Supports:
      GET  /api/records/?search=ananya
      GET  /api/records/?record_type=Student
    """

    serializer_class = RecordSerializer

    def get_queryset(self):
        queryset = Record.objects.all()
        search = self.request.query_params.get("search")
        record_type = self.request.query_params.get("record_type")

        if search:
            queryset = queryset.filter(
                Q(full_name__icontains=search)
                | Q(id_number__icontains=search)
                | Q(dept_class__icontains=search)
                | Q(email__icontains=search)
            )
        if record_type and record_type != "all":
            queryset = queryset.filter(record_type=record_type)

        return queryset

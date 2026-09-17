from django.contrib import admin

from .models import Record


@admin.register(Record)
class RecordAdmin(admin.ModelAdmin):
    list_display = ("full_name", "record_type", "id_number", "dept_class", "email", "join_date")
    list_filter = ("record_type",)
    search_fields = ("full_name", "id_number", "email")

from django.db import models


class Record(models.Model):
    class RecordType(models.TextChoices):
        STUDENT = "Student", "Student"
        EMPLOYEE = "Employee", "Employee"

    full_name = models.CharField(max_length=150)
    record_type = models.CharField(max_length=10, choices=RecordType.choices)
    id_number = models.CharField(max_length=50, unique=True)
    dept_class = models.CharField(max_length=100, verbose_name="Department / Class")
    email = models.EmailField()
    join_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["full_name"]

    def __str__(self):
        return f"{self.full_name} ({self.record_type})"

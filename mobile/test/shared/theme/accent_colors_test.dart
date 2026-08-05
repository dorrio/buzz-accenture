import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:buzz/shared/theme/theme.dart';

void main() {
  group('default accent', () {
    test('uses Accenture Purple on the default light scheme', () {
      final resolved = resolveSchemes(null, ThemeMode.light);

      final accented = applyAccent(resolved.light, defaultAccentIndex);

      expect(accented.primary, const Color(0xFFA100FF));
    });

    test('uses Accenture Purple on forced dark schemes', () {
      final resolved = resolveSchemes('github-dark', ThemeMode.dark);
      final base = resolved.dark;

      final accented = applyAccent(base, defaultAccentIndex);

      expect(resolved.forcedMode, ThemeMode.dark);
      expect(accented.primary, const Color(0xFFC27DFF));
      expect(accented.primary, isNot(const Color(0xFF000000)));
      expect(
        _contrastRatio(accented.primary, accented.surface),
        greaterThanOrEqualTo(4.5),
      );
      expect(accented.onPrimary, contrastForeground(accented.primary));
    });
  });
}

double _contrastRatio(Color a, Color b) {
  final aLum = a.computeLuminance();
  final bLum = b.computeLuminance();
  final lightest = aLum > bLum ? aLum : bLum;
  final darkest = aLum > bLum ? bLum : aLum;
  return (lightest + 0.05) / (darkest + 0.05);
}
